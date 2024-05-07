import { EventEmitter } from './components/base/events';
import { BasketData } from './components/BasketData';
import { CardsData } from './components/CardsData';
import { OrderData } from './components/OrderData';
import { UserData } from './components/UserData';
import { ICard, IMakeOrder } from './types';
import { API_URL } from './utils/constants';
import './scss/styles.scss';
import { LarekApi } from './components/LarekApi';
import { Api } from './components/base/api';

const events = new EventEmitter();
const url = API_URL;

const api = new Api(url);
const cardsData = new CardsData(events);
const basketData = new BasketData(events);
const userData = new UserData(events);
const orderData = new OrderData(events);
const larekApi = new LarekApi(api);
const cardsArr: ICard[] = [];


// Testing of Api
const card: ICard = {
    "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
    "description": "Если планируете решать задачи в тренажёре, берите два.",
    "image": "/5_Dots.svg",
    "title": "+1 час в сутках",
    "category": "софт-скил",
    "price": 750
};

const data: IMakeOrder = {
    payment: 'online',
    email: 'ilya@ya.ru',
    phone: '79991231212',
    address: 'Pushkin st.',
    total: 750,
    items: ['854cef69-976d-4c2a-a18c-2aa45046c390'],
}

larekApi.getCatalog()
    .then(cards => {
        cardsData.cards = cards.items;
        console.log(cardsData.cards);
    })

larekApi.getItem(card.id)
    .then(card => console.log(card));

larekApi.makeOrder(data)
    .then(res => console.log(res));

// End of testing Api