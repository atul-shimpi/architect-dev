import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material";
import {ComponentType} from "@angular/cdk/portal";

@Injectable()
export class Modal {

    constructor(private dialog: MatDialog) {}

    public open<T>(component: ComponentType<T>, data: object): MatDialogRef<T> {
        return this.dialog.open(component, {panelClass: 'modal', data: data});
    }

}
