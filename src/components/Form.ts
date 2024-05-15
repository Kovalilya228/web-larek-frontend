import { TPaymentMethod } from "../types";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

interface IForm {
}

export class Form extends Component<IForm> {
    events: IEvents;
    submitButton: HTMLButtonElement;
    isValid: boolean;
    formErrors: HTMLElement;

    constructor(protected container: HTMLFormElement, events: IEvents, protected handleSubmit: Function) {
        super(container);
        this.events = events;
        this.formErrors = this.container.querySelector('.form__errors');
        this.submitButton = this.container.querySelector('.modal__actions').querySelector('.button');
        this.container.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.handleSubmit();
        })
        this.container.addEventListener('change', () => {
            events.emit('form:check', { form: this });
        })
    }

    setButtonState() {
        if (this.isValid) {
            this.submitButton.removeAttribute('disabled');
        } else {
            this.submitButton.setAttribute('disabled', '');
        }
    }
}