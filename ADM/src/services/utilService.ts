import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UtilService{

    constructor(private http: HttpClient){}

    findByCep(cep){
        var _viacep = "https://viacep.com.br/ws/"+cep+"/json/";        
        return this.http.get(_viacep);
    }
    
}