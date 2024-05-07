import { EventEmitter } from './components/base/events';
import { BasketData } from './components/BasketData';
import { CardsData } from './components/CardsData';
import { OrderData } from './components/OrderData';
import { UserData } from './components/UserData';
import { ICard } from './types';
import { API_URL } from './utils/constants';
import './scss/styles.scss';
import { LarekApi } from './components/LarekApi';

const events = new EventEmitter();
const url = API_URL;

const cardsData = new CardsData(events);
const basketData = new BasketData(events);
const userData = new UserData(events);
const orderData = new OrderData(events);
const larekApi = new LarekApi(url);
const cardsArr: ICard[] = [];

larekApi.getCatalog()
    .then(data => {
        let key = 'items' as keyof typeof data;
        cardsData.cards = data[key];
        console.log(cardsData.cards);
    })

const card: ICard = {
    "id": "854cef69-976d-4c2a-a18c-2aa45046c390",
    "description": "Если планируете решать задачи в тренажёре, берите два.",
    "image": "/5_Dots.svg",
    "title": "+1 час в сутках",
    "category": "софт-скил",
    "price": 750
};