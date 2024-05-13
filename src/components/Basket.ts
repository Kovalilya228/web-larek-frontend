import { ICard } from "../types";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

interface IBasket {
    basketPrice: string;
    basketList: HTMLLIElement[] | ICard[];
}

export class Basket extends Component<IBasket> {
    protected events: IEvents;
    submitButton: HTMLButtonElement;
    _basketPrice: HTMLElement;
    _basketList: HTMLElement;

    constructor(protected container: HTMLElement, events: IEvents, protected handleSubmit: Function) {
        super(container);
        this.events = events;
        this.submitButton = this.container.querySelector('.basket__button');
        this._basketPrice = this.container.querySelector('.basket__price');
        this._basketList = this.container.querySelector('.basket__list');

        this.submitButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.handleSubmit();
        })
    }

    get basketPrice() {
        return this._basketPrice.textContent;
    }

    set basketPrice(data: string) {
        this._basketPrice.textContent = `${data} синапсов`;
    }

    set basketList(data: HTMLLIElement[]) {
        this._basketList.replaceChildren(...data);
    }
}