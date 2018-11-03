import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '../interfaces/response';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { IOrder } from 'src/interfaces/orders';

@Injectable()
export class OrderService{

    _url = environment.apiUrl+"orders/";

    constructor(private http: HttpClient){}

    getOrders(): Observable<IResponse>{
        return this.http.get<IResponse>(this._url);
    }

    insertOrder(object){
      return this.http.post(this._url, object, {observe: 'response'});
    }

    updatetOrder(object){
      return this.http.put(this._url, object, {observe: 'response'});
    }

    getOrderById(orderId){
      return this.http.get<IOrder>(this._url + orderId, {observe: 'response'});
    }

    deleteOrderById(orderId){
      return this.http.delete(this._url + orderId, {observe: 'response'});
    }

    filter(object){
      return this.http.post(this._url + 'filter', object, { observe: 'response' });
    }
    
}
