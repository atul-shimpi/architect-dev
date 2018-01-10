import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator, MatSort} from "@angular/material";
import {UrlAwarePaginator} from "vebto-client/admin/pagination/url-aware-paginator.service";
import {AdminTableDataSource} from "vebto-client/admin/admin-table-data-source";
import {Plans} from "../plans.service";
import {Plan} from "../plan";
import {Modal} from "vebto-client/core/ui/modal.service";
import {CurrentUser} from "vebto-client/auth/current-user";
import {ConfirmModalComponent} from "vebto-client/core/ui/confirm-modal/confirm-modal.component";
import {CrupdatePlanModalComponent} from "../crupdate-plan-modal/crupdate-plan-modal.component";

@Component({
    selector: 'plans-list',
    templateUrl: './plans-list.component.html',
    styleUrls: ['./plans-list.component.scss'],
    providers: [UrlAwarePaginator],
    encapsulation: ViewEncapsulation.None
})
export class PlansListComponent implements OnInit {
    @ViewChild(MatPaginator) matPaginator: MatPaginator;
    @ViewChild(MatSort) matSort: MatSort;

    public dataSource: AdminTableDataSource<Plan>;

    /**
     * PlansComponent Constructor.
     */
    constructor(
        public paginator: UrlAwarePaginator,
        private plans: Plans,
        private modal: Modal,
        public currentUser: CurrentUser,
    ) {}

    ngOnInit() {
        this.dataSource = new AdminTableDataSource<Plan>(
            'billing/plans', this.paginator, this.matPaginator, this.matSort
        );
    }

    /**
     * Ask user to confirm deletion of selected plans
     * and delete selected plans if user confirms.
     */
    public maybeDeleteSelectedPlans() {
        this.modal.show(ConfirmModalComponent, {
            title: 'Delete Plans',
            body:  'Are you sure you want to delete selected plans?',
            ok:    'Delete'
        }).afterClosed().subscribe(confirmed => {
            if ( ! confirmed) return;
            this.deleteSelectedPlans();
        });
    }

    /**
     * Delete currently selected plans.
     */
    public deleteSelectedPlans() {
        const ids = this.dataSource.selectedRows.selected.map(project => project.id);

        this.plans.delete({ids}).subscribe(() => {
            this.paginator.refresh();
            this.dataSource.selectedRows.clear();
        });
    }

    /**
     * Show modal for editing project if project is specified
     * or for creating a new project otherwise.
     */
    public showCrupdatePlanModal(project?: Plan) {
        this.modal.show(CrupdatePlanModalComponent, {project}).afterClosed().subscribe(data => {
            if ( ! data) return;
            this.paginator.refresh();
        });
    }
}
