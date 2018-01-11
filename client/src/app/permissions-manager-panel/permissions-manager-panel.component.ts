import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {SelectPermissionsModalComponent} from "../../../node_modules/vebto-client/admin/users/select-permissions-modal/select-permissions-modal.component";
import {Modal} from "../../../node_modules/vebto-client/core/ui/modal.service";

@Component({
    selector: 'permissions-manager-panel',
    templateUrl: './permissions-manager-panel.component.html',
    styleUrls: ['./permissions-manager-panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PermissionsManagerPanelComponent implements OnInit {

    @Input() public model: object = {};

    constructor(private modal: Modal) {
    }

    ngOnInit() {
    }

    /**
     * Show panel for attaching new permissions to plan.
     */
    public showAddPermissionsModal() {
        this.modal.open(SelectPermissionsModalComponent).afterClosed().subscribe(permissions => {
            if ( ! permissions) return;
            this.addNewPermissions(permissions);
        });
    }

    /**
     * Remove given permission from model.
     */
    public removePermission(permission) {
        //need to assign new object instead of editing a reference
        //so angular change detection gets triggered for pipe
        let newPermissions = Object.assign({}, this.model.permissions) as any;
        delete newPermissions[permission];
        this.model = newPermissions;
    }

    /**
     * Add given permissions to model.
     */
    public addNewPermissions(permissions: string[]) {
        let newPermissions = {};

        permissions.forEach(permission => {
            newPermissions[permission] = 1;
        });

        this.model = Object.assign({}, this.model.permissions, newPermissions);
    }
}
