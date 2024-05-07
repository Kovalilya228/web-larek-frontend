import { IEvents } from "./base/events";
import { IBasketData, ICard } from "../types";

export class BasketData implements IBasketData {
    protected _cards: ICard[];
    protected events: IEvents;
    
    constructor(events: IEvents) {
        this._cards = [];
        this.events = events;
    }

    addCard(card: ICard) {
        this._cards.push(card);
    }

    deleteCard(cardId: string) {
        this._cards = this._cards.filter(card => cardId !== card.id);
    }

    deleteAllCards() {
        this._cards = [];
    }

    get cards() {
        return this._cards;
    }
}