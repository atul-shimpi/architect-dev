export class LivePreviewScroller {

    private scrollDownTimeout;
    private scrollUpTimeout;
    private previewHeight: number;

    /**
     * LivePreviewScroller Constructor.
     */
    constructor(
        private document: Document,
        private previewContainer: HTMLElement
    ) {}

    /**
     * Scroll iframe body when given y is above or below it.
     */
    public scroll(y: number) {
        let scrollTop = this.document.documentElement.scrollTop,
            pointY = y + scrollTop;

        if ( ! this.previewHeight) {
            this.previewHeight = this.previewContainer.offsetHeight;
        }

        if (pointY - scrollTop <= 20) {
            this.scrollFrameUp()
        } else if (pointY > scrollTop + this.previewHeight - 80) {
            this.scrollFrameDown();
        } else {
            this.stopScrolling();
        }
    }

    /**
     * Clear all scrolling intervals.
     */
    public stopScrolling() {
        clearInterval(this.scrollDownTimeout);
        return clearInterval(this.scrollUpTimeout);
    }

    /**
     * Scroll iframe down by 40 pixels.
     */
    private scrollFrameDown() {
        clearInterval(this.scrollDownTimeout);
        return this.scrollDownTimeout = setInterval(() => {
            return this.setScrollTop(this.document.documentElement.scrollTop + 40)
        }, 40)
    }

    /**
     * Scroll iframe up by 40 pixels.
     */
    private scrollFrameUp() {
        clearInterval(this.scrollUpTimeout);
        return this.scrollUpTimeout = setInterval(() => {
            return this.setScrollTop(this.document.documentElement.scrollTop - 40)
        }, 40)
    }

    /**
     * Set given scroll on iframe document element.
     */
    private setScrollTop(newScrollTop: number) {
        newScrollTop = Math.max(0, newScrollTop);
        this.document.documentElement.scrollTop = newScrollTop;
    }
}
