import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDatepicker, MatDialogRef} from "@angular/material";
import {Subscriptions} from "../subscriptions.service";
import {Subscription} from "../subscription";
import {Toast} from "vebto-client/core/ui/toast.service";
import * as moment from 'moment';
import {FormControl} from "@angular/forms";
import {debounceTime, switchMap} from "rxjs/operators";
import {Users} from "vebto-client/auth/users.service";
import {Observable} from "rxjs/Observable";
import {User} from "vebto-client/core/types/models/User";
import {Subject} from "rxjs/Subject";

@Component({
    selector: 'crupdate-subscription-modal',
    templateUrl: './crupdate-subscription-modal.component.html',
    styleUrls: ['./crupdate-subscription-modal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CrupdateSubscriptionModalComponent implements OnInit {

    /**
     * Whether subscription is currently being saved.
     */
    public loading: boolean = false;

    /**
     * Subscription model.
     */
    public model: Subscription;

    /**
     * If we are updating existing subscription or creating a new one.
     */
    public updating: boolean = false;

    /**
     * Errors returned from backend.
     */
    public errors: any = {};

    public userAutocomplete: FormControl = new FormControl(null);

    public filteredUsers: Observable<User[]> = new Subject();

    /**
     * CrupdateUserModalComponent Constructor.
     */
    constructor(
        private dialogRef: MatDialogRef<CrupdateSubscriptionModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {subscription?: Subscription},
        public subscriptions: Subscriptions,
        private toast: Toast,
        private users: Users,
    ) {
        this.resetState();
    }

    // /**
    //  * Perform a search when user types into search input.
    //  */
    // private bindToSearchQuery() {
    //     this.searchQuery.valueChanges
    //         .debounceTime(400)
    //         .distinctUntilChanged()
    //         .switchMap(query => {
    //             this.searching = true;
    //             if ( ! query) return Observable.of(this.getEmptyResultSet());
    //             return this.search.everything(query, {limit: 3}).catch(() => {
    //                 this.searching = false;
    //                 return Observable.of(this.getEmptyResultSet());
    //             });
    //         }).subscribe(response => {
    //         this.results = response;
    //         this.noResults = !this.responseHasResults(response);
    //         this.searching = false;
    //         if (this.searchQuery.value) this.open();
    //     });
    // }

    ngOnInit() {
        this.resetState();

        this.filteredUsers = this.userAutocomplete.valueChanges
            .pipe(
                debounceTime(400),
                switchMap(val => this.findUsers(val))
            );

        if (this.data.subscription) {
            this.updating = true;
            this.hydrateModel(this.data.subscription);
        } else {
            this.updating = false;
        }
    }

    private findUsers(query: string): Observable<User[]> {
        return this.users.getAll({query});
    }

    /**
     * Create a new subscription or update existing one.
     */
    public confirm() {
        this.loading = true;
        let request;

        if (this.updating) {
            request = this.subscriptions.update(this.data.subscription.id, this.getPayload());
        } else {
            request = this.subscriptions.create(this.getPayload());
        }

        request.subscribe(response => {
            console.log(response);
            this.close(response.subscription);
            let action = this.updating ? 'updated' : 'created';
            this.toast.open('Subscription has been '+action);
            this.loading = false;
        }, response => {
            this.errors = response.messages;
            this.loading = false;
        });
    }

    /**
     * Close the modal.
     */
    public close(data?: any) {
        this.resetState();
        this.dialogRef.close(data);
    }

    public displayFn(user?: User): string {
        return user ? user.email : null;
    }

    /**
     * Populate subscription model with given data.
     */
    private hydrateModel(subscription: Subscription) {
        this.model = Object.assign({}, subscription);
    }

    /**
     * Get request payload for backend.
     */
    private getPayload() {
        let payload = {
            renews_at: this.momentToMysql(this.model.renews_at as any),
            ends_at: this.momentToMysql(this.model.ends_at as any),
            description: this.model.description,
        };

        //if we are creating a new subscription, add user ID to payload
        if ( ! this.updating && this.userAutocomplete.value) {
            payload['user_id'] = this.userAutocomplete.value.id;
        }

        return payload;
    }

    /**
     * Format moment instance into mysql timestamp format.
     */
    private momentToMysql(moment: moment.Moment) {
        if ( ! moment) return null;
        return moment.endOf('day').format('YYYY-MM-DD HH:mm:ss');
    }

    /**
     * Reset all modal state to default.
     */
    private resetState() {
        this.model = new Subscription();
        this.errors = {};
    }

    /**
     * Toggle specified date picker's state between open and closed.
     */
    public toggleDatePicker(datePicker: MatDatepicker<Date>) {
        if (datePicker.opened) {
            datePicker.close();
        } else {
            datePicker.open();
        }
    }
}
