import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {CreditCard} from "../upgrade-page/upgrade-page.component";
import {Subscriptions} from "../subscriptions/subscriptions.service";
import {finalize} from "rxjs/operators";
import {CurrentUser} from "vebto-client/auth/current-user";
import {utils} from "vebto-client/core/services/utils";

@Component({
    selector: 'credit-card-form',
    templateUrl: './credit-card-form.component.html',
    styleUrls: ['./credit-card-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreditCardFormComponent {

    /**
     * Event fired when form is submitted and card is added successfully on active gateway.
     */
    @Output() created: EventEmitter<CreditCard> = new EventEmitter();

    /**
     * Display text for form submit button.
     */
    @Input() submitButtonText: string = 'Submit';

    /**
     * Whether form submit button should be shown.
     */
    @Input() showSubmitButton: boolean = true;

    /**
     * Whether order summary should be shown in the template.
     */
    @Input() showOrderSummary: boolean = false;

    /**
     * Whether backend request is in progress.
     */
    public loading: boolean = false;

    /**
     * Errors returned from backend.
     */
    public errors: {card: CreditCard, general?: string};

    /**
     * Months for credit card expiration select.
     */
    public months = [1,2,3,4,5,6,7,8,9,10,11,12];

    /**
     * Years for credit card expiration select.
     */
    public years = [];

    /**
     * Credit card form model.
     */
    public cardModel: CreditCard;

    /**
     * CreditCardFormComponent Constructor.
     */
    constructor(
        private subscriptions: Subscriptions,
        private currentUser: CurrentUser
    ) {
        this.resetForm();
        const currentYear = (new Date).getFullYear();
        this.years = utils.range(currentYear, currentYear+21);
    }

    public submitForm() {
        this.loading = true;

        this.subscriptions.addCard(this.cardModel)
            .pipe(finalize(() => this.loading = false))
            .subscribe(response => {
                this.resetForm();
                this.currentUser.assignCurrent(response.user);
                this.created.emit(this.cardModel);
            }, response => {
                this.errors = response.messages;
            });
    }

    /**
     * Reset credit card form.
     */
    private resetForm() {
        this.cardModel = {expiration_month: '', expiration_year: ''};
        this.errors = {card: {}};
    }
}
