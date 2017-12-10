import {Injectable} from '@angular/core';
import {Elements} from "../elements/elements.service";

@Injectable()
export class ContextBoxes {

    constructor(private elements: Elements) {}

    private hoverBox: HTMLElement;
    private selectedBox: HTMLElement;

    private minHeight = 50;
    private spacing = 10;
    private minWidth = 100;

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
            this.getBox(name).style.top = this.getBoxTop(rect) + 'px';
            this.getBox(name).style.left = this.getBoxLeft(rect) + 'px';
            this.getBox(name).style.height = this.getBoxHeight(rect) + 'px';
            this.getBox(name).style.width = this.getBoxWidth(rect) + 'px';
            this.showBox(name);
        }
    };

    private getBoxHeight(rect: ClientRect) {
        const height = rect.height < this.minHeight ? this.minHeight : rect.height;
        return height + this.spacing;
    }

    private getBoxWidth(rect: ClientRect) {
        const width = rect.width < this.minWidth ? this.minWidth : rect.width;
        return width + this.spacing;
    }

    private getBoxTop(rect: ClientRect) {
        const offset = rect.height < this.minHeight ? this.minHeight - rect.height : 0;
        return rect.top - (offset /2) - (this.spacing / 2);
    }

    private getBoxLeft(rect: ClientRect) {
        const offset = rect.width < this.minWidth ? this.minWidth - rect.width : 0;
        return rect.left - (offset /2) - (this.spacing / 2);
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
