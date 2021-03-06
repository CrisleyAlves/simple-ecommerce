import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { IResponse } from 'src/interfaces/response';
import { IProduct } from 'src/interfaces/products';

@Injectable()
export class ProductService{

    _url = environment.apiUrl+"products/";

    constructor(private http: HttpClient){}

    getAllProducts(): Observable<IResponse>{
        return this.http.get<IResponse>(this._url);
    }

    insertProduct(object){
      return this.http.post(this._url, object, {observe: 'response'});
    }

    updatetProduct(object){
      return this.http.put(this._url, object, {observe: 'response'});
    }

    getProductById(productId){
      return this.http.get<IProduct>(this._url + productId, {observe: 'response'});
    }

    deleteProductById(productId){
      return this.http.delete(this._url + productId, {observe: 'response'});
    }

    filter(object){
      return this.http.post(this._url + 'filter', object, { observe: 'response' });
    }
    
}
