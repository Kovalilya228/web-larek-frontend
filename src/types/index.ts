interface IEvents {
    on<T extends object>(event: string | RegExp, callback: (data: T) => void): void;
    emit<T extends object>(event: string, data?: T): void;
    trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}

export type TCategory = 'софт-скилл' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скилл';

export type TPaymentMethod = 'Онлайн' | 'При получении';

export interface ICard {
	_id: string;
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
	payment: TPaymentMethod;
}

export interface ICardsData {
	_cards: ICard[];
    _preview: string | null;
    events: IEvents;
    getCard(cardID: string): ICard;
}

export type TCardPublic = Pick<ICard, 'title' | 'category' | 'image' | 'price'>;

export interface IBasketData {
	cards: ICard[];
	total: number;
    events: IEvents;
    addCard(card: ICard): void;
    deleteCard(cardID: string): void;
    deleteAllCards(): void;
    getCards() : ICard[];
}

export interface IUserData {
    email: Pick<IUser, 'email'>;
    phone: Pick<IUser, 'phone'>;
    events: IEvents;
    setEmail(email: Pick<IUser, 'email'>): void;
    setPhone(phone: Pick<IUser, 'phone'>): void;
    clearData(): void;
    checkUserInfo(data: Record<keyof IUser, string>): boolean;
}

export interface IOrderData {
    payment: Pick<IOrder, 'payment'>;
    address: Pick<IOrder, 'address'>;
    total: number;
    events: IEvents;
    setPayment(paymentMethod: Pick<IOrder, 'payment'>): void;
    setAddress(address: Pick<IOrder, 'address'>): void;
    clearData(): void;
    checkOrderInfo(data: Record<keyof IOrder, string>): boolean;
}