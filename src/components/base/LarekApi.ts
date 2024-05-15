import { IApi, IMakeOrder, ICard, IGetCatalogApiResponse, IPostOrderApiResponse } from "../../types";

export class LarekApi {
    private _baseApi: IApi;

    constructor(baseApi: IApi) {
        this._baseApi = baseApi;
    }

    getCatalog(): Promise<IGetCatalogApiResponse> {
        return this._baseApi.get<IGetCatalogApiResponse>('/product/').then((cards: IGetCatalogApiResponse) => cards);
    }

    getItem(id: string): Promise<ICard> {
        return this._baseApi.get(`/product/${id}`).then((card: ICard) => card);
    }

    makeOrder(data: IMakeOrder): Promise<IPostOrderApiResponse> {
        return this._baseApi.post('/order', data).then((res: IPostOrderApiResponse) => res);
    }
}