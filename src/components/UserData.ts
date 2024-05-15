import { IEvents } from './base/events';
import { IUserData, IUser } from '../types/index';

export class UserData implements IUserData {
    _email: string;
    _phone: string;
    events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    set email(email: string) {
        this._email = email;
    }

    set phone(phone: string) {
        this._phone = phone;
    }

    get userInfo() {
        return { email: this._email, phone: this._phone };
    }
}
