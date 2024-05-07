import { Api } from "./base/api";
import { IMakeOrder } from "../types";

export class LarekApi extends Api {
    readonly baseUrl: string;
    protected options: RequestInit;

    getCatalog() {
        return this.get('/product/')
    }

    getItem(id: string) {
        return this.get(`/product/${id}`)
    }

    makeOrder(data: IMakeOrder) {
        return this.post('/order', data)
    }
}