import {Injectable} from '@angular/core';
import {Elements} from "../elements/elements.service";

@Injectable()
export class ContextBoxes {

    constructor(private elements: Elements) {}

    private hoverBox: HTMLElement;
    private selectedBox: HTMLElement;

    public repositionBox(name: 'hover'|'selected', node: HTMLElement, el?: any) {

        //hide context boxes depending on user settings
        // if (! settings.get('enable'+name.ucFirst()+'Box')) {
        //     return $scope[name+'Box'].hide();
        // }

        if (node && node.nodeName == 'BODY') {
            return this.hideBox(name);
        }

        if ( ! el) el = this.elements.match(node);
        if ( ! el) return true;

        if (name === 'selected') {
            this.hideBox('hover');
        }

        const rect = node.getBoundingClientRect();

        if ( ! rect.width || ! rect.height) {
            this.hideBox(name);
        } else {
            this.getBox(name).style.top = rect.top+'px';
            this.getBox(name).style.left = rect.left+'px';
            this.getBox(name).style.height = rect.height+'px';
            this.getBox(name).style.width = rect.width+'px';
            this.showBox(name);
        }
    };

    /**
     * Hide specified context box.
     */
    public hideBox(name: 'hover'|'selected') {
        this.getBox(name).classList.add('hidden');
    }

    public showBox(name: 'hover'|'selected') {
        this.getBox(name).classList.remove('hidden');
    }

    public set(hover: HTMLElement, selected: HTMLElement) {
        this.hoverBox = hover;
        this.selectedBox = selected;
    }

    private getBox(name: 'hover'|'selected'): HTMLElement {
        return name === 'hover' ? this.hoverBox : this.selectedBox;
    }
}
