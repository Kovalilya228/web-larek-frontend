import { isEmpty } from "../utils/utils";
import { Form } from "./Form";
import { IEvents } from "./base/events";

export class FormUser extends Form {
    phone: HTMLInputElement;
    email: HTMLInputElement;
    constructor(protected container: HTMLFormElement, events: IEvents, handleSubmit: Function) {
        super(container, events, handleSubmit);
        this.phone = this.container.elements.namedItem('phone') as HTMLInputElement;
        this.email = this.container.elements.namedItem('email') as HTMLInputElement;
    }

    get value() {
        return { phone: this.phone.value, email: this.email.value };
    }

    checkValid() {
        this.isValid = (isEmpty(this.phone.value) || isEmpty(this.email.value)) ? false : true;
    }
}