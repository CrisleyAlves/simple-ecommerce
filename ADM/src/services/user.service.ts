import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/users';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class UserService{

    _url = environment.apiUrl+"users/";

    constructor(private http: HttpClient){}

    getUsers(): Observable<IUser[]>{
        return this.http.get<IUser[]>(this._url);
    }

    insertUser(object){
      return this.http.post(this._url, object, {observe: 'response'});
    }

    getUserById(userId){
      return this.http.get(this._url + userId, {observe: 'response'});
    }

    deleteUserById(userId){
      return this.http.delete(this._url + userId, {observe: 'response'});
    }
}
