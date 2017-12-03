import {Component, ComponentRef, OnInit, ViewEncapsulation} from '@angular/core';
import {Overlay, OverlayRef} from "@angular/cdk/overlay";
import {ComponentPortal} from "@angular/cdk/portal";
import {TemplatesPanelComponent} from "./templates-panel/templates-panel.component";
import {Inspector} from "../inspector.service";
import {ParsedProject} from "../../projects/parsed-project";

@Component({
    selector: 'settings-panel',
    templateUrl: './settings-panel.component.html',
    styleUrls: ['./settings-panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SettingsPanelComponent implements OnInit {

    private overlayRef: OverlayRef;

    constructor(
        private overlay: Overlay,
        private inspector: Inspector,
        public activeProject: ParsedProject,
    ) {}

    ngOnInit() {

    }

    public openTemplatesPanel() {
        const strategy = this.overlay.position().connectedTo(
            this.inspector.elementRef,
            {originX: 'end', originY: 'top'},
            {overlayX: 'start', overlayY: 'top'}
        );

        const height = this.inspector.elementRef.nativeElement.getBoundingClientRect().height;

        this.overlayRef = this.overlay.create({positionStrategy: strategy, hasBackdrop: true, height: height});

        this.overlayRef.backdropClick().subscribe(() => {
            this.overlayRef.dispose();
        });

        const componentRef = this.overlayRef
            .attach(new ComponentPortal(TemplatesPanelComponent)) as ComponentRef<TemplatesPanelComponent>;
    }

    public openThemesPanel() {

    }
}
