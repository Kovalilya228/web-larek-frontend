import { ICard } from "../types";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

interface IBasket {
    basketPrice: string;
    basketList: HTMLElement[];
    basketIndexes: string[];
}

export class Basket extends Component<IBasket> {
    events: IEvents;
    submitButton: HTMLButtonElement;
    _basketPrice: HTMLElement;
    _basketList: HTMLElement;
    basketButton: HTMLElement;
    _basketCounter: HTMLElement;

    constructor(protected container: HTMLElement, events: IEvents, protected handleSubmit: Function) {
        super(container);
        this.events = events;
        this.submitButton = this.container.querySelector('.basket__button');
        this._basketPrice = this.container.querySelector('.basket__price');
        this._basketList = this.container.querySelector('.basket__list');
        this.basketButton = document.querySelector('.header__basket');
        this._basketCounter = this.basketButton.querySelector('.header__basket-counter');

        this.submitButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.handleSubmit();
        })

        this.basketButton.addEventListener('click', () => {
            this.events.emit('basket:open');
        });
    }

    get basketCounter() {
        return this._basketCounter.textContent;
    }

    set basketCounter(count: string) {
        this._basketCounter.textContent = count;
    }

    get basketPrice() {
        return this._basketPrice.textContent;
    }

    set basketPrice(data: string) {
        this._basketPrice.textContent = `${data} синапсов`;
    }

    set basketList(data: HTMLElement[]) {
        this._basketList.replaceChildren(...data);
    }
}