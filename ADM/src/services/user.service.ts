import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { IResponse } from 'src/interfaces/response';
import { IUser } from 'src/interfaces/users';

@Injectable()
export class UserService{

    _url = environment.apiUrl+"users/";

    constructor(private http: HttpClient){}

    getUsers(): Observable<IResponse>{
        return this.http.get<IResponse>(this._url);
    }

    insertUser(object){
      return this.http.post(this._url, object, {observe: 'response'});
    }

    updateUser(object){
      return this.http.put(this._url, object, {observe: 'response'});
    }

    getUserById(userId){
      return this.http.get<IUser>(this._url + userId, {observe: 'response'});
    }

    deleteUserById(userId){
      return this.http.delete(this._url + userId, {observe: 'response'});
    }

    filter(object){
      return this.http.post(this._url + 'filter', object, { observe: 'response' });
    }
    
}
