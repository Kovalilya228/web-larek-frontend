import { Component } from "./base/Component";
import { IEvents } from "./base/events";

export class Modal extends Component<HTMLElement> {
    events: IEvents;
    content: HTMLElement;
    closeButton: HTMLButtonElement;

    constructor(protected container: HTMLElement, events: IEvents, content: HTMLElement) {
        super(container);
        this.events = events;
        this.content = this.container.querySelector('.modal__content');
        this.closeButton = this.container.querySelector('.modal__close');
        this.setContent(content);
        this.closeButton.addEventListener('click', () => {
            this.close();
        })
    }

    setContent(content: HTMLElement) {
        this.content.replaceChildren(content);
    }

    open() {
        this.container.classList.add('modal_active');
    }

    close() {
        this.container.classList.remove('modal_active');
    }
}