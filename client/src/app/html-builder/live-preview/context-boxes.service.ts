import {Injectable} from '@angular/core';
import {Elements} from "../elements/elements.service";
import {LocalStorage} from "vebto-client/core/services/local-storage.service";
import {utils} from "vebto-client/core/services/utils";

@Injectable()
export class ContextBoxes {

    /**
     * ContextBoxes service constructor.
     */
    constructor(
        private elements: Elements,
        private localStorage: LocalStorage
    ) {}

    private hoverBox: HTMLElement;
    private selectedBox: HTMLElement;

    private minHeight = 40;

    /**
     * Spacing between context box and selected element.
     */
    private spacing = 10;

    private minWidth = 100;

    public repositionBox(name: 'hover'|'selected', node: HTMLElement, el?: any) {
        //hide context boxes depending on user settings
        if ( ! this.localStorage.get('settings.'+name+'BoxEnabled', true)) return;

        if (node && (node.nodeName === 'BODY' || node.nodeName === 'HTML')) {
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
            this.getBox(name).style.top = this.getBoxTop(rect) + 'px';
            this.getBox(name).style.left = this.getBoxLeft(rect) + 'px';
            this.getBox(name).style.height = this.getBoxHeight(rect) + 'px';
            this.getBox(name).style.width = this.getBoxWidth(rect) + 'px';
            this.showBox(name);
        }

        //place context box toolbar on the bottom, if there's not enough space top
        if (parseInt(this.getBox(name).style.top) < 20) {
            this.getBox(name).classList.add('toolbar-bottom');
        } else {
            this.getBox(name).classList.remove('toolbar-bottom');
        }
    };

    private getBoxHeight(rect: ClientRect) {
        const height = rect.height < this.minHeight ? this.minHeight : rect.height;
        return height + (this.spacing * 2);
    }

    private getBoxWidth(rect: ClientRect) {
        const width = rect.width < this.minWidth ? this.minWidth : rect.width;
        return width + (this.spacing * 2);
    }

    private getBoxTop(rect: ClientRect) {
        const offset = rect.height < this.minHeight ? this.minHeight - rect.height : 0;
        return rect.top - (offset /2) - this.spacing;
    }

    private getBoxLeft(rect: ClientRect) {
        const offset = rect.width < this.minWidth ? this.minWidth - rect.width : 0;
        return rect.left - (offset /2) - this.spacing;
    }

    /**
     * Hide specified context box.
     */
    public hideBox(name: 'hover'|'selected') {
        this.getBox(name).classList.add('hidden');
    }

    /**
     * Hide all context boxes.
     */
    public hideBoxes() {
        this.hideBox('selected');
        this.hideBox('hover');
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
