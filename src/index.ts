import { EventEmitter } from './components/base/events';
import { BasketData } from './components/BasketData';
import { CardsData } from './components/CardsData';
import { OrderData } from './components/OrderData';
import { UserData } from './components/UserData';
import { ICard, IMakeOrder } from './types';
import { API_URL } from './utils/constants';
import './scss/styles.scss';
import { LarekApi } from './components/base/LarekApi';
import { Api } from './components/base/api';
import { Card } from './components/Card';
import { FormUser } from './components/FormUser';
import { Modal } from './components/Modal';
import { FormOrder } from './components/FormOrder';
import { CardsCatalog } from './components/CardsCatalog';
import { cloneTemplate } from './utils/utils';
import { Basket } from './components/Basket';
import { Success } from './components/Success';

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

const basketTemplate: HTMLTemplateElement = document.querySelector('#basket');
const cardGalleryTemplate: HTMLTemplateElement = document.querySelector('#card-catalog');
const cardFullTemplate: HTMLTemplateElement = document.querySelector('#card-preview');
const cardCompactTemplate: HTMLTemplateElement = document.querySelector('#card-basket');
const formUserTemplate: HTMLTemplateElement = document.querySelector('#contacts');
const formOrderTemplate: HTMLTemplateElement = document.querySelector('#order');
const formSuccessTemplate: HTMLTemplateElement = document.querySelector('#success');

const cardsCatalog = new CardsCatalog(cardsCatalogElement);
const modal = new Modal(modalElement, events);
const basket = new Basket(cloneTemplate(basketTemplate), events, submitBasket);

larekApi.getCatalog()
    .then(cards => {
        events.emit('cards:load', { cards: cards })
    })

events.on('cards:load', loadCards);
events.on('card:open', openCard);
events.on('card:submit', submitCard);
events.on('card:delete', deleteCard);
events.on('basket:open', openBasket);
events.on('form:openUser', openFormUser);
events.on('form:openOrder', openFormOrder);
events.on('form:check', checkForm);
events.on('form:submitOrder', submitOrderForm);
events.on('form:submitUser', submitUserForm);
events.on('order:make', makeOrder);
events.on('form:success', openSuccessForm);

function loadCards(cards: { cards: { items: ICard[] } }) {
    cardsData.cards = cards.cards.items;
    const cardsArr: any[] = [];
    cardsData.cards.forEach(card => {
        const newCard = new Card(cloneTemplate(cardGalleryTemplate), events);
        cardsArr.push(newCard.render(card));
    })
    cardsCatalog.render({ catalog: cardsArr });
}

function submitCard(data: { card: Card }) {
    if (!checkCardInBasket(data.card)) {
        basketData.addCard(cardsData.getCard(data.card.id));
        basket.basketCounter = String(basketData.cards.length);
        data.card.submitValue = 'В корзину';
    } else {
        events.emit('basket:open');
    }
}

function openCard(data: { card: Card }) {
    cardsData.preview = data.card.id;
    const cardFull = new Card(cloneTemplate(cardFullTemplate), events);
    if (checkCardInBasket(data.card)) cardFull.submitValue = 'В корзину';
    modal.setContent(cardFull.render(cardsData.getCard(cardsData.preview)));
    modal.open();
}

function openBasket() {
    checkBasketCards();
    if (!modal._isActive) modal.open();
    modal.setContent(basket.render({
        basketList: makeBasketList(),
        basketPrice: `${basketData.totalPrice}`,
    }))
}

function makeBasketList() {
    return basketData.cards.map(card => {
        const cardBasket = new Card(cloneTemplate(cardCompactTemplate), events);
        cardBasket.indexLabel = String(basketData.cards.indexOf(card) + 1);
        return cardBasket.render(card);
    })
}

function submitBasket() {
    events.emit('form:openOrder');
}

function checkCardInBasket(card: Card | ICard) {
    return basketData.cards.find(cardBasket => cardBasket.id === card.id)
}

function deleteCard(data: { card: Card }) {
    basketData.deleteCard(data.card.id);
    checkBasketCards();
    basket.basketPrice = String(basketData.totalPrice);
    basket.basketCounter = String(basketData.cards.length);
    data.card.delete();
    modal.setContent(basket.render({
        basketList: makeBasketList(),
        basketPrice: `${basketData.totalPrice}`,
    }))
}

function checkBasketCards() {
    if (basketData.cards.length === 0) {
        basket.submitButton.setAttribute('disabled', '');
    } else {
        basket.submitButton.removeAttribute('disabled');
    }
}

function openFormUser() {
    const formUser = new FormUser(cloneTemplate(formUserTemplate), events, submitUserHandler);
    modal.setContent(formUser.render());
}

function openFormOrder() {
    const formOrder = new FormOrder(cloneTemplate(formOrderTemplate), events, submitOrderHandler);
    modal.setContent(formOrder.render());
}

function submitOrderHandler() {
    events.emit('form:submitOrder', { form: this });
}

function checkForm(data: { form: FormOrder | FormUser }) {
    data.form.checkValid();
    data.form.setButtonState();
}

function submitOrderForm(data: { form: FormOrder }) {
    const formData = data.form.value;
    orderData.address = formData.address;
    orderData.payment = formData.payment;
    events.emit('form:openUser');
}

function submitUserHandler() {
    events.emit('form:submitUser', { form: this });
}

function submitUserForm(data: { form: FormUser }) {
    const formData = data.form.value;
    userData.email = formData.email;
    userData.phone = formData.phone;
    events.emit('order:make')
}

function makeOrder() {
    const data: IMakeOrder = {
        address: orderData.orderInfo.address,
        phone: userData.userInfo.phone,
        payment: orderData.orderInfo.payment,
        email: userData.userInfo.email,
        items: basketData.cardsId,
        total: basketData.totalPrice,
    }
    larekApi.makeOrder(data)
        .then(res => {
            if (res) events.emit('form:success');
            else events.emit('form:error');
        });
}

function openSuccessForm() {
    const successForm = new Success(cloneTemplate(formSuccessTemplate), events, submitSuccessHandler);
    modal.setContent(successForm.render({ price: String(basketData.totalPrice) }))
}

function submitSuccessHandler() {
    basketData.deleteAllCards();
    checkBasketCards();
    basket.basketPrice = String(basketData.totalPrice);
    basket.basketCounter = String(basketData.cards.length);
    modal.close();
}