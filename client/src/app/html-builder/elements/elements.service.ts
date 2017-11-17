import {Injectable} from "@angular/core";
import {baseElements} from "./definitions/base";
import {bootstrapElements} from "./definitions/bootstrap";
import {ActiveElement} from "../live-preview/active-element";

@Injectable()
export class Elements {

    private elements = [];

    /**
     * Default element config.
     */
    private defaults = {
        name: 'Generic',
        canModify: ['padding', 'margin', 'box', 'text', 'attributes', 'float', 'shadows', 'background'],
        canDrag: true,
        showWysiwyg: true,
        attributes: {},
        previewScale: 1,
        scaleDragPreview: true,
        resizable: true,
        types: ['flow'],
        validChildren: ['flow'],
    };

    /**
     * Array of special cases conditions when selecting a DOM node.
     */
    private specialCases = [

        //if selecting label with parent with .checkbox should select parent instead.
        function(node, parent, classes, pClasses) {
            if (node.nodeName == 'LABEL' && pClasses.indexOf('checkbox') > -1) {
                return node.parentNode;
            }
        },

        //if selecting .progress-bar, select parent instead
        function(node, parent, classes, pClasses) {
            if (classes.indexOf('progress-bar') > -1) {
                return node.parentNode;
            }
        },

        //if selecting .container-fluid with .navbar parent, select parent instead
        function(node, parent, classes, pClasses) {
            if (classes.indexOf('container-fluid') > -1 && pClasses.indexOf('navbar') > -1) {
                return node.parentNode;
            }
        },
    ];

    public getAll() {
        return this.elements;
    }

    public getElement(name: string) {
        return this.elements[name];
    }

    public checkForSpecialCases(node: HTMLElement): HTMLElement|boolean {
        if ( ! node ) return false;

        //cache some needed node properties
        let parent = node.parentNode,
            classes = node.nodeName,
            parentClasses = parent ? parent.nodeName : '';

        //test node against every special case until the end or until we find a match
        for (let i = 0; i < this.specialCases.length; i++) {
            const check = this.specialCases[i](node, parent, classes, parentClasses);
            if (check) return check;
        }
    }

    /**
     * Check if given node accepts currently active element as a child.
     */
    public canInsert(parent: HTMLElement, child: ActiveElement) {

        if (parent.nodeName == 'BODY') return true;

        if (parent.nodeName == 'HTML') return false;

        //match given node to an element in element repository
        const el = this.match(parent);

        //if we've got an element match and it has any valid children check
        //if specified child can be inserted into given node
        if (el && el.validChildren && child.element.types) {
            for (let i = el.validChildren.length - 1; i >= 0; i--) {
                if (child.element.types.indexOf(el.validChildren[i]) > -1) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Match specified DOM node to an element in the repository.
     */
    public match(node: HTMLElement, type = null, matchParent = true) {
        if ( ! node || ! node.nodeName) return false;

        const isSpecialCase = this.checkForSpecialCases(node),
              nodeName = node.nodeName.toLowerCase();

        if (isSpecialCase) {
            if (type == 'hover') {
                //$rootScope.hover.node = check;
            } else if (type == 'select') {
                //$rootScope.selected.node = check;
            }
            node = isSpecialCase as HTMLElement;
        }

        //find by class
        if (node.className) {
            for (let i = 0; i < this.elements.length; i++) {
                let element = this.elements[i];

                let classes = node.className.toLowerCase().split(/\s+/);

                for (let i = 0; i < classes.length; i++) {

                    //if element has no class we'll bail
                    if ( ! element.class) continue;

                    //if element and passed in node classes match exactly we'll just return current element
                    if (classes[i] === element.class) {
                        return element;
                    }

                    //if we didn't match an element by this time we'll try to do it using
                    //a wildcard so we can match bootstrap columns and similar stuff
                    if (element.class.indexOf('*') > -1 && classes[i].match(new RegExp(element.class.replace('*', '.*')))) {
                        return element;
                    }
                }
            }
        }

        for (let i = 0; i < this.elements.length; i++) {
            let element = this.elements[i];

            //find by name attribute
            if (node.dataset && node.dataset.name) {
                return this.getElement(node.dataset.name);
            }

            //find by input type
            if (node['type']) {
                const type = nodeName+'='+node['type'];

                if (element.nodes.find(nodeName => nodeName == type)) {
                    return element;
                }
            }

            //find by node name
            if (element.nodes.indexOf(nodeName) > -1) {
                return element;
            }
        }

        // if we've got no matches by this point and we've got
        // a true flag, will try to match this nodes parent instead
        if (matchParent) {
            return this.match(node.parentNode as HTMLElement, type, true);

        //if no true flag passed we'll just return a generic object
        } else {
            let className = node.className.split(/\s+/)[0];
            let defaults = Object.assign({}, this.defaults);

            if (className) {
                defaults.name = className.replace('-', ' ');
            } else {
                defaults.name = node.nodeName.toLowerCase();
            }

            return defaults;
        }
    }

    /**
     * Register a new element with the builder.
     */
    public addElement(config) {
        //merge defaults and passed in element config objects
        const el = Object.assign({}, this.defaults, config);

        //we'll need both snake case and camel case names for the element
        //el.camelName = config.name.toCamelCase();
        el.snakeName = config.name.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});

        //push newly created element to all elements object
        this.elements.push(el);
    }


    /**
     * Register all the base builder elements
     */
    public init(customElements: any[]) {
        const elements = baseElements.concat(bootstrapElements);
        elements.forEach(element => this.addElement(element));
        this.addCustomElements(customElements);
    }

    private addCustomElements(customElements: any[]) {
        let customCss = '';

        customElements.forEach(element => {
            let config = eval(element.config);
            config.html = element.html;
            config.css = element.css;

            this.addElement(config);

            customCss += "\n"+config.css;
        });
    }
}