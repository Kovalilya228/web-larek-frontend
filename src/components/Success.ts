import { Component } from "./base/Component";
import { IEvents } from "./base/events";

interface ISuccess {
    price: string;
}

export class Success extends Component<ISuccess> {
    _price: HTMLElement;
    submitButton: HTMLButtonElement;
    constructor(protected container: HTMLElement, events: IEvents, protected handleSubmit: Function) {
        super(container);
        this.submitButton = this.container.querySelector('.order-success__close');
        this._price = this.container.querySelector('.order-success__description');

        this.submitButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.handleSubmit();
        })
    }

    set price(price: string) {
        this._price.textContent = `Списано ${price} синапсов`;
    }
}