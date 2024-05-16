import { Form } from "./Form";
import { IEvents } from "./base/events";

export class FormUser extends Form {
    phone: HTMLInputElement;
    email: HTMLInputElement;
    constructor(protected container: HTMLFormElement, events: IEvents, handleSubmit: Function) {
        super(container, events, handleSubmit);
        this.phone = this.container.elements.namedItem('phone') as HTMLInputElement;
        this.email = this.container.elements.namedItem('email') as HTMLInputElement;
        this.phone.addEventListener('keydown', () => {
            events.emit('form:check', this);
        })
        this.email.addEventListener('keydown', () => {
            events.emit('form:check', this);
        })
    }

    get userInputsValue() {
        return { phone: this.phone.value, email: this.email.value };
    }

    checkValid() {
        if (this.phone.value === '') {
            this.formErrors.textContent = 'Вы не указали номер телефона.';
            this.isValid = false;
        } else if (this.email.value === '') {
            this.formErrors.textContent = 'Вы не указали электронную почту.';
            this.isValid = false;
        } else {
            this.formErrors.textContent = '';
            this.isValid = true;
        }
    }
}