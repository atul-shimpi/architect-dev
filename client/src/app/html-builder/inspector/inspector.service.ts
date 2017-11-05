import {Injectable} from '@angular/core';

type panelNames = 'elements'|'inspector'|'pages'|'themes'|'settings';

@Injectable()
export class Inspector {

    private activePanel: panelNames = 'elements';

    public togglePanel(name: panelNames) {
        this.activePanel = name;
    }

    public activePanelIs(name: panelNames) {
        return this.activePanel === name;
    }
}
