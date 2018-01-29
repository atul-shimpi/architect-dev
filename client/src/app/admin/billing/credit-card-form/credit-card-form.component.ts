import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {CreditCard} from "../upgrade-page/upgrade-page.component";
import {Subscriptions} from "../subscriptions/subscriptions.service";
import {finalize} from "rxjs/operators";
import {CurrentUser} from "vebto-client/auth/current-user";
import {utils} from "../../../../../node_modules/vebto-client/core";

@Component({
    selector: 'credit-card-form',
    templateUrl: './credit-card-form.component.html',
    styleUrls: ['./credit-card-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreditCardFormComponent {

    @Output() created: EventEmitter<CreditCard> = new EventEmitter();

    @Input() submitButtonText: string = 'Submit';

    @Input() showSubmitButton: boolean = true;

    public loading: boolean = false;

    public errors: {card: CreditCard, general?: string} = {card: {}};

    public months = [1,2,3,4,5,6,7,8,9,10,11,12];

    public years = [2020];

    public cardModel: CreditCard = {expiration_month: '', expiration_year: ''};

    constructor(
        private subscriptions: Subscriptions,
        private currentUser: CurrentUser
    ) {
        const year = (new Date).getFullYear();
        this.years = utils.range(year, year+21);
    }

    public submitForm() {
        this.loading = true;

        this.subscriptions.addCard(this.cardModel)
            .pipe(finalize(() => this.loading = false))
            .subscribe(response => {
                this.currentUser.assignCurrent(response.user);
                this.created.emit(response.user);
            }, response => {
                this.errors = response.messages;
            });
    }
}
