import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator, MatSort} from "@angular/material";
import {UrlAwarePaginator} from "vebto-client/admin/pagination/url-aware-paginator.service";
import {AdminTableDataSource} from "vebto-client/admin/admin-table-data-source";
import {Modal} from "vebto-client/core/ui/modal.service";
import {CurrentUser} from "vebto-client/auth/current-user";
import {ConfirmModalComponent} from "vebto-client/core/ui/confirm-modal/confirm-modal.component";
import {finalize} from "rxjs/operators";
import {Toast} from "vebto-client/core";
import {Subscription} from "../subscription";
import {Subscriptions} from "../subscriptions.service";

@Component({
    selector: 'subscriptions-list',
    templateUrl: './subscriptions-list.component.html',
    styleUrls: ['./subscriptions-list.component.scss'],
    providers: [UrlAwarePaginator],
    encapsulation: ViewEncapsulation.None
})
export class SubscriptionsListComponent implements OnInit {
    @ViewChild(MatPaginator) matPaginator: MatPaginator;
    @ViewChild(MatSort) matSort: MatSort;

    public dataSource: AdminTableDataSource<Subscription>;

    /**
     * Whether server request is currently in progress.
     */
    public loading: boolean = false;

    /**
     * SubscriptionsComponent Constructor.
     */
    constructor(
        public paginator: UrlAwarePaginator,
        private subscriptions: Subscriptions,
        private modal: Modal,
        public currentUser: CurrentUser,
        private toast: Toast,
    ) {}

    ngOnInit() {
        this.dataSource = new AdminTableDataSource<Subscription>(
            'billing/subscriptions', this.paginator, this.matPaginator, this.matSort
        );
    }

    /**
     * Ask user to confirm cancellation of subscription
     * and delete it if user confirms.
     */
    public maybeCancelSubscription(subscription: Subscription) {
        this.modal.open(ConfirmModalComponent, {
            title: 'Cancel Subscription',
            body: 'Are you sure you want to cancel this subscription?',
            bodyBold: 'This will cancel or suspend subscription based on its gateway and put user on grace period until their next scheduled renewal date and allow them to renew the subscription.',
            ok: 'Cancel',
            cancel: 'Go Back'
        }).afterClosed().subscribe(confirmed => {
            if ( ! confirmed) return;
            this.cancelOrDeleteSubscription(subscription, {delete: false});
        });
    }

    /**
     * Ask user to confirm deletion of subscription
     * and delete it if user confirms.
     */
    public maybeDeleteSubscription(subscription: Subscription) {
        this.modal.open(ConfirmModalComponent, {
            title: 'Delete Subscription',
            body: 'Are you sure you want to delete this subscription?',
            bodyBold: 'This will permanently delete user subscription and immediately cancel it on billing gateway.',
            ok: 'Delete',
            cancel: 'Go Back'
        }).afterClosed().subscribe(confirmed => {
            if ( ! confirmed) return;
            this.cancelOrDeleteSubscription(subscription, {delete: true});
        });
    }

    /**
     * Cancel specified subscription.
     */
    private cancelOrDeleteSubscription(subscription: Subscription, params: {delete?: boolean} = {}) {
        this.loading = true;

        this.subscriptions.cancel(subscription.id, {delete: params.delete})
            .pipe(finalize(() => this.loading = false))
            .subscribe(response => {
                this.paginator.refresh(); 
                this.toast.open('Subscription cancelled.');
            });
    }
}
