import { Component } from "./base/Component";
import { IEvents } from "./base/events";

export class Modal extends Component<HTMLElement> {
    events: IEvents;
    content: HTMLElement;
    closeButton: HTMLButtonElement;
    _isActive: boolean;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;
        this.content = this.container.querySelector('.modal__content');
        this.closeButton = this.container.querySelector('.modal__close');

        this.closeButton.addEventListener('click', () => {
            this.close();
        })

        this.container.addEventListener('click', (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        })
    }

    get isActive() {
        return this._isActive;
    }

    set isActive(value: boolean) {
        this._isActive = value;
    }

    setContent(content: HTMLElement) {
        this.content.replaceChildren(content);
    }

    open() {
        document.addEventListener('keydown', this.closeOnEsc.bind(this));
        this.container.classList.add('modal_active');
        document.querySelector('.page__wrapper').classList.add('page__wrapper_locked');
        this._isActive = true;
    }

    close() {
        this.container.classList.remove('modal_active');
        document.querySelector('.page__wrapper').classList.remove('page__wrapper_locked');
        document.removeEventListener('keydown', this.closeOnEsc.bind(this));
        this._isActive = false;
    }

    closeOnEsc(evt: KeyboardEvent) {
        if (evt.key === 'Escape') {
            this.close()
        }
    }
}