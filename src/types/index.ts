interface IEvents {
    on<T extends object>(event: string | RegExp, callback: (data: T) => void): void;
    emit<T extends object>(event: string, data?: T): void;
    trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}

export type TCategory = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';

export type TCategoryClass = {
    'софт-скил': 'card__category_soft',
    'хард-скил': 'card__category_hard',
    'другое': 'card__category_other',
    'кнопка': 'card__category_button',
    'дополнительное': 'card__category_additional',
}

export type TPaymentMethod = 'Онлайн' | 'При получении' | 'online' | 'offline';

export interface ICard {
    id: string;
    title: string;
    category: TCategory;
    image: string;
    description: string;
    price: string;
    index?: string;
}

export interface IUser {
    email: string;
    phone: string;
}

export interface IOrder {
    address: string;
    payment: TPaymentMethod | null;
}

export interface ICardsData {
    get cards(): ICard[];
    set cards(cards: ICard[]);
    getCard(cardId: string): ICard;
}

export type TCardPublic = Pick<ICard, 'title' | 'category' | 'image' | 'price'>;

export interface IBasketData {
    addCard(card: ICard): void;
    deleteCard(cardId: string): void;
    deleteAllCards(): void;
    get cards(): ICard[];
}

export interface IUserData {
    _email: string;
    _phone: string;
    events: IEvents;
    set email(email: string);
    set phone(phone: string);
    get userInfo(): Record<keyof IUser, string>;
}

export interface IOrderData {
    events: IEvents;
    set payment(paymentMethod: TPaymentMethod);
    set address(address: string);
    get orderInfo(): Record<keyof IOrder, string>
}

export interface IMakeOrder {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    baseUrl: string;
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IGetCatalogApiResponse {
    items: ICard[];
    total: number;
}

export interface IPostOrderApiResponse {
    total: number;
    id: string;
}