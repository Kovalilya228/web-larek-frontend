interface IEvents {
    on<T extends object>(event: string | RegExp, callback: (data: T) => void): void;
    emit<T extends object>(event: string, data?: T): void;
    trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}

export type TCategory = 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скилл';

export type TPaymentMethod = 'Онлайн' | 'При получении';

export interface ICard {
	id: string;
	title: string;
	category: TCategory;
	image: string;
	description: string;
	price: number;
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
    get cards() : ICard[];
}

export interface IUserData {
    _email: string;
    _phone: string;
    events: IEvents;
    set email(email: string);
    set phone(phone: string);
    get userInfo(): Record<keyof IUser, string>;
    clearData(): void;
    checkUserInfo(data: Record<keyof IUser, string>): boolean;
}

export interface IOrderData {
    events: IEvents;
    set payment(paymentMethod: TPaymentMethod);
    set address(address: string);
    get orderInfo(): Record<keyof IOrder, string>
    clearData(): void;
    checkOrderInfo(data: Record<keyof IOrder, string>): boolean;
}

export interface IMakeOrder{
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}