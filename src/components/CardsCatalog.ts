import { ICard } from "../types";
import { Component } from "./base/Component";

interface ICardsCatalog {
    catalog: HTMLElement[];
}

export class CardsCatalog extends Component<ICardsCatalog> {
    protected _catalog: HTMLElement;

    constructor(protected container: HTMLElement) {
        super(container);
    }

    set catalog(items: HTMLElement[]) {
        this.container.replaceChildren(...items);
    }
}