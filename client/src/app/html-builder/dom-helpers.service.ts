import {Injectable} from '@angular/core';

@Injectable()
export class DomHelpers {

    constructor() {
    }

    public static swapNodes(node1: HTMLElement, node2: HTMLElement) {
        //if (node1.contains(node2) || node2.contains(node1)) return;

        // save the location of node2
        let parent2 = node2.parentNode;
        let next2 = node2.nextSibling;

        // special case for node1 is the next sibling of node2
        if (next2 === node1) {
            // just put node1 before node2
            parent2.insertBefore(node1, node2);
        } else {
            // insert node2 right before node1
            node1.parentNode.insertBefore(node2, node1);

            // now insert node1 where node2 was
            if (next2) {
                // if there was an element after node2, then insert node1 right before that
                parent2.insertBefore(node1, next2);
            } else {
                // otherwise, just append as last child
                parent2.appendChild(node1);
            }
        }
    }

    public static reorderDom(newOrder: HTMLElement[], oldOrder: HTMLElement[]) {
        let swapped = [];

        newOrder.forEach((newNode, i) => {
            const positionChanged = oldOrder[i] !== newNode,
                current = oldOrder[i];

            if ( ! positionChanged || swapped.indexOf(current) > -1 || swapped.indexOf(newNode) > -1) return;

            DomHelpers.swapNodes(current, newNode);
            swapped.push(newNode);
        });
    }
}
