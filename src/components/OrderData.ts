import { IEvents } from "./base/events";
import { IOrderData, TPaymentMethod, IOrder } from "../types";

export class OrderData implements IOrderData {
    protected _payment: TPaymentMethod | null;
    protected _address: string;
    events: IEvents;

    constructor(events: IEvents) {
        this._payment = null;
        this._address = '';
        this.events = events;
    }

    set payment(paymentMethod: TPaymentMethod) {
        this._payment = paymentMethod;
    }

    set address(address: string) {
        this._address = address;
    }

    get orderInfo() {
        return { payment: this._payment, address: this._address }
    }
}