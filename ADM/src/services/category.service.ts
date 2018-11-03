import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { IResponse } from 'src/interfaces/response';
import { ICategory } from 'src/interfaces/category';

@Injectable()
export class CategoryService{

    _url = environment.apiUrl+"categories/";

    constructor(private http: HttpClient){}

    getAllCategories(): Observable<IResponse>{
        return this.http.get<IResponse>(this._url);
    }

    insertCategory(object){
      return this.http.post(this._url, object, {observe: 'response'});
    }

    updateCategory(object){
      return this.http.put(this._url, object, {observe: 'response'});
    }

    getCategoryById(categoryId){
      return this.http.get<ICategory>(this._url + categoryId, {observe: 'response'});
    }

    deleteCategoryById(categoryId){
      return this.http.delete(this._url + categoryId, {observe: 'response'});
    }

    filter(object){
      return this.http.post(this._url + 'filter', object, { observe: 'response' });
    }
    
}
