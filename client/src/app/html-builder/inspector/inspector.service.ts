import {Injectable} from '@angular/core';
import {SelectedElement} from "../live-preview/selected-element.service";

type PanelNames = 'elements'|'inspector'|'pages'|'themes'|'settings'|'layout';

@Injectable()
export class Inspector {

    private activePanel: PanelNames = 'elements';

    constructor(private selectedElement: SelectedElement) {
        this.selectedElement.changed.subscribe(() => {
            if (this.selectedElement.isLayout()) {
                this.openPanel('layout');
            } else {
                this.openPanel('inspector');
            }
        });
    }

    public togglePanel(name: PanelNames) {
        this.activePanel = name;
    }

    public openPanel(name: PanelNames) {
        if (this.activePanelIs(name)) return;
        this.activePanel = name;
    }

    public activePanelIs(name: PanelNames) {
        return this.activePanel === name;
    }
}
