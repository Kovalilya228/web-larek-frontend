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

const url = API_URL;
const modalElement: HTMLElement = document.querySelector('#modal-container');
const cardsCatalogElement: HTMLTemplateElement = document.querySelector('.gallery');
const basketTemplate: HTMLTemplateElement = document.querySelector('#basket');
const cardGalleryTemplate: HTMLTemplateElement = document.querySelector('#card-catalog');
const cardFullTemplate: HTMLTemplateElement = document.querySelector('#card-preview');
const cardCompactTemplate: HTMLTemplateElement = document.querySelector('#card-basket');
const formUserTemplate: HTMLTemplateElement = document.querySelector('#contacts');
const formOrderTemplate: HTMLTemplateElement = document.querySelector('#order');
const formSuccessTemplate: HTMLTemplateElement = document.querySelector('#success');

const events = new EventEmitter();
const api = new Api(url);
const larekApi = new LarekApi(api);
const cardsData = new CardsData(events);
const basketData = new BasketData(events);
const userData = new UserData(events);
const orderData = new OrderData(events);
const cardsCatalog = new CardsCatalog(cardsCatalogElement);
const modal = new Modal(modalElement, events);
const basket = new Basket(cloneTemplate(basketTemplate), events, submitBasket);

function loadCards(cards: ICard[]) {
    cardsData.cards = cards;
    const cardsArr: any[] = [];
    cardsData.cards.forEach(card => {
        const newCard = new Card(cloneTemplate(cardGalleryTemplate), events);
        cardsArr.push(newCard.render(card));
    })
    cardsCatalog.render({ catalog: cardsArr });
}

function submitCard(card: Card) {
    if (!checkCardInBasket(card)) {
        basketData.addCard(cardsData.getCard(card.id));
        basket.basketCounter = String(basketData.cards.length);
        card.submitValue = 'В корзину';
    } else {
        events.emit('basket:open');
    }
}

function openCard(card: Card) {
    cardsData.preview = card.id;
    const cardFull = new Card(cloneTemplate(cardFullTemplate), events);
    if (checkCardInBasket(card)) cardFull.submitValue = 'В корзину';
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

function deleteCard(card: Card) {
    basketData.deleteCard(card.id);
    checkBasketCards();
    basket.basketPrice = String(basketData.totalPrice);
    basket.basketCounter = String(basketData.cards.length);
    card.delete();
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
    events.emit('form:submitOrder', this);
}

function checkForm(form: FormOrder | FormUser) {
    form.checkValid();
    form.setButtonState();
}

function submitOrderForm(form: FormOrder) {
    const formData = form.orderInputsValue;
    orderData.address = formData.address;
    orderData.payment = formData.payment;
    events.emit('form:openUser');
}

function submitUserHandler() {
    events.emit('form:submitUser', this);
}

function submitUserForm(form: FormUser) {
    const formData = form.userInputsValue;
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
        })
        .catch(err => {
            console.log(err);
        })
}

function openSuccessForm() {
    const successForm = new Success(cloneTemplate(formSuccessTemplate), events, submitSuccessHandler);
    modal.setContent(successForm.render({ price: String(basketData.totalPrice) }))
    basketData.deleteAllCards();
    checkBasketCards();
    basket.basketPrice = String(basketData.totalPrice);
    basket.basketCounter = String(basketData.cards.length);
}

function submitSuccessHandler() {
    modal.close();
}

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

larekApi.getCatalog()
    .then(cards => {
        events.emit('cards:load', cards.items)
    })
    .catch(err => {
        console.log(err);
    })