import { IEvents } from "./base/events";
import { IBasketData, ICard } from "../types";

export class BasketData implements IBasketData {
    protected _cards: ICard[];
    protected events: IEvents;
    protected _totalPrice: number = 0;

    constructor(events: IEvents) {
        this._cards = [];
        this.events = events;
    }

    addCard(card: ICard) {
        this._cards.push(card);
        this.events.emit('card:added');
    }

    deleteCard(cardId: string) {
        this._cards = this._cards.filter(card => cardId !== card.id);
    }

    deleteAllCards() {
        this._cards = [];
    }

    get totalPrice() {
        this.findTotal();
        return this._totalPrice;
    }

    findTotal() {
        let temp: number = 0;
        this.cards.map(card => {
            temp += Number(card.price);
        })
        this._totalPrice = temp;
    }

    get cards() {
        return this._cards;
    }

    get cardsId() {
        return this._cards.map(card => card.id);
    }
}