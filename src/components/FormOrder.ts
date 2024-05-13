import { TPaymentMethod } from "../types";
import { isEmpty } from "../utils/utils";
import { Form } from "./Form";
import { IEvents } from "./base/events";

export class FormOrder extends Form {
    payment_buttons: HTMLButtonElement[];
    payment_cash: HTMLButtonElement;
    payment_card: HTMLButtonElement;
    address: HTMLInputElement;
    _paymentMethod: TPaymentMethod;
    constructor(protected container: HTMLFormElement, events: IEvents, handleSubmit: Function) {
        super(container, events, handleSubmit);
        this.payment_cash = this.container.elements.namedItem('cash') as HTMLButtonElement;
        this.payment_card = this.container.elements.namedItem('card') as HTMLButtonElement;
        this.address = this.container.elements.namedItem('address') as HTMLInputElement;

        this.payment_cash.addEventListener('click', () => {
            this.events.emit('payment:select', { method: this.payment_cash.name });
            this.payment_cash.setAttribute('disabled', '');
            this.payment_card.removeAttribute('disabled');
            this._paymentMethod = 'offline';
        })
        this.payment_card.addEventListener('click', () => {
            this.events.emit('payment:select', { method: this.payment_card.name });
            this.payment_card.setAttribute('disabled', '');
            this.payment_cash.removeAttribute('disabled');
            this._paymentMethod = 'online';
        })
    }

    checkValid() {
        this.isValid = (isEmpty(this.address.value) || !this._paymentMethod) ? false : true;
    }

    get paymentMethod() {
        return this._paymentMethod;
    }

    set paymentMethod(data: TPaymentMethod) {
        this._paymentMethod = data;
    }

    get value() {
        return { address: this.address.value, payment: this._paymentMethod }
    }
}