import { ICard, TCardPublic, TCategory } from "../types";
import { IEvents } from "./base/events";
import { CDN_URL } from '../utils/constants';
import { Component } from "./base/Component";

export class Card extends Component<ICard> {
    protected _id: string;
    events: IEvents;
    submitButton: HTMLButtonElement;
    protected _category: HTMLElement;
    protected _title: HTMLElement;
    protected _image: HTMLImageElement;
    protected _price: HTMLElement;
    protected _description: HTMLElement;
    protected deleteButton: HTMLButtonElement;
    protected _indexLabel: HTMLElement;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;
        this._title = this.container.querySelector('.card__title');
        this._price = this.container.querySelector('.card__price');

        switch (this.container.tagName.toLowerCase()) {
            case 'button':
                this._category = this.container.querySelector('.card__category');
                this._image = this.container.querySelector('.card__image');

                this.container.addEventListener('click', () => {
                    this.events.emit('card:open', { card: this });
                });

                break;
            case 'div':
                this._image = this.container.querySelector('.card__image');
                this._category = this.container.querySelector('.card__category');
                this._description = this.container.querySelector('.card__text');
                this.submitButton = this.container.querySelector('.card__button');
                this.submitValue = 'Купить';
                this.submitButton.addEventListener('click', () => {
                    this.events.emit('card:submit', { card: this });
                });
                break;
            case 'li':
                this._indexLabel = this.container.querySelector('.basket__item-index');
                this.deleteButton = this.container.querySelector('.card__button');

                this.deleteButton.addEventListener('click', () => {
                    this.events.emit('card:delete', { card: this });
                })

                break;
        }
    }

    set submitValue(textContent: string) {
        this.submitButton.textContent = textContent;
    }

    set id(id: string) {
        this._id = id;
    }

    get id() {
        return this._id;
    }

    set price(price: string) {
        if (!price) {
            this._price.textContent = 'Бесценно';
            this.submitButton?.setAttribute('disabled', '');
        } else {
            this._price.textContent = price + ' синапсов';
        }

    }

    get price() {
        return this._price.textContent;
    }

    set category(category: TCategory) {
        if (this._category) this._category.textContent = category;
    }

    get category() {
        return this._category.textContent as TCategory;
    }

    set description(description: string) {
        if (this._description) this._description.textContent = description;
    }

    get description() {
        return this._description.textContent;
    }

    set title(title: string) {
        if (this._title) this._title.textContent = title;
    }

    get title() {
        return this._title.textContent;
    }

    set image(image: string) {
        if (this._image) this._image.src = `${CDN_URL}${image}`;
    }

    get image() {
        return this._image.src;
    }

    set indexLabel(index: string) {
        this._indexLabel.textContent = index;
    }

    get indexLabel() {
        return this._indexLabel.textContent;
    }

    delete() {
        this.container.remove();
        this.container = null;
    }
}