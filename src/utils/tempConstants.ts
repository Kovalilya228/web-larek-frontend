import { ICard, IMakeOrder } from "../types";

export const testCard: ICard = {
    "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
    "description": "Если планируете решать задачи в тренажёре, берите два.",
    "image": "/5_Dots.svg",
    "title": "+1 час в сутках",
    "category": "софт-скил",
    "price": '750'
};

export const data: IMakeOrder = {
    payment: 'online',
    email: 'ilya@ya.ru',
    phone: '79991231212',
    address: 'Pushkin st.',
    total: 750,
    items: ['854cef69-976d-4c2a-a18c-2aa45046c390'],
}