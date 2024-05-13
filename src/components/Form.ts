import { TPaymentMethod } from "../types";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

interface IForm {
}

export class Form extends Component<IForm> {
    formName: string;
    events: IEvents;
    orderFields: NodeListOf<HTMLInputElement>;
    submitButton: HTMLButtonElement;
    isValid: boolean;

    constructor(protected container: HTMLFormElement, events: IEvents, protected handleSubmit: Function) {
        super(container);
        this.formName = this.container.name;
        this.events = events;
        this.submitButton = this.container.querySelector('.modal__actions').querySelector('.button');
        this.container.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.handleSubmit();
        })
        this.container.addEventListener('change', () => {
            events.emit('form:check', { form: this });
        })
    }

    setValid() {
        if (this.isValid) {
            this.submitButton.removeAttribute('disabled');
        } else {
            this.submitButton.setAttribute('disabled', '');
        }
    }
}
// Пересмотреть возможность реализации универсальной формы. Возможно лучше сделать 2 разные,
// для ордера и для контактс.