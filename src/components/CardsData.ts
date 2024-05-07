import {ICard, ICardsData} from '../types/index';
import {IEvents} from './base/events';

export class CardsData implements ICardsData {
    protected _cards: ICard[];
    protected _preview: string | null;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
        this._cards = [];
    }

    get cards() {
        return this._cards;
    }

    get preview() {
        return this._preview;
    }

    set preview(cardId: string) {
        this._preview = cardId;
    }

    set cards(cards: ICard[]) {
        this._cards = cards;
        this.events.emit('cards:changed');
    }

    getCard(cardId: string) {
        return this._cards.find(card => card.id === cardId);
    }
}