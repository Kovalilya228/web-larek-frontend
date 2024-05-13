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
import { Card } from './components/Card';
import { FormUser } from './components/FormUser';
import { Modal } from './components/Modal';
import { FormOrder } from './components/FormOrder';
import { CardsCatalog } from './components/CardsCatalog';
import { cloneTemplate } from './utils/utils';
import { data, testCard } from './utils/tempConstants';

const events = new EventEmitter();
const url = API_URL;

const api = new Api(url);
const larekApi = new LarekApi(api);
const cardsData = new CardsData(events);
const basketData = new BasketData(events);
const userData = new UserData(events);
const orderData = new OrderData(events);

const modalElement: HTMLElement = document.querySelector('#modal-container');
const cardsCatalogElement: HTMLTemplateElement = document.querySelector('.gallery');
const cardGalleryTemplate: HTMLTemplateElement = document.querySelector('#card-catalog');
const cardFullTemplate: HTMLTemplateElement = document.querySelector('#card-preview');
const cardCompactTemplate: HTMLTemplateElement = document.querySelector('#card-basket');
const cardsCatalog = new CardsCatalog(cardsCatalogElement);

// Testing of Api

larekApi.getCatalog()
    .then(cards => {
        events.emit('cards:loaded', { cards: cards })
    })

larekApi.getItem(testCard.id)
// .then(card => console.log(card));

larekApi.makeOrder(data)
// .then(res => console.log(res));

events.on('cards:loaded', (cards: { cards: { items: ICard[] } }) => {

    cardsData.cards = cards.cards.items;
    const cardsArr: any[] = [];
    cardsData.cards.forEach(card => {
        const newCard = new Card(cloneTemplate(cardGalleryTemplate), events);
        cardsArr.push(newCard.render(card));
    })
    cardsCatalog.render({ catalog: cardsArr });
})

events.on('card:open', (data: { card: Card }) => {
    cardsData.preview = data.card.id;
    const cardFull = new Card(cloneTemplate(cardFullTemplate), events);
    const isInBasket = basketData.cards.find(card => card.id === data.card.id);
    if (isInBasket) cardFull.submitValue = 'В корзину';
    const modal = new Modal(modalElement, events, cardFull.render(cardsData.getCard(cardsData.preview)));
    modal.open();
})

events.on('card:add', (data: { card: Card }) => {
    basketData.addCard(cardsData.getCard(data.card.id));
    data.card.submitValue = 'В корзину';
    data.card.submitButton.removeEventListener('click', () => { })
    // cardsData.preview = data.card.id;
    // const cardFull = new Card(cloneTemplate(cardFullTemplate), events);
    // const modal = new Modal(modalElement, events, cardFull.render(cardsData.getCard(cardsData.preview)));
    // modal.open();
})