import { Injectable } from "@angular/core";

import {HttpClient} from '@angular/common/http'
import { ContactModel } from '../interfaces/contactModel';
import { ContactModelPayload } from '../interfaces/contactModelPayload';
@Injectable({
    providedIn:'root'
})
export class HttpService{

    /**This service is used as a repository for HTTP calls */
    baseURL = ""

    constructor(private http: HttpClient){

    }

    createNewContact(data: ContactModelPayload){
        return this.http.post(this.baseURL+'api/newContact',data);
    }
    updateContact(data:ContactModel){
        return this.http.put(this.baseURL+"api/updateContact",data)
    }

    getContacts(){
        return this.http.get(this.baseURL+'api/allContacts')
    }
    getSingleContact(id){
        return this.http.post(this.baseURL+'api/getSingleContact',{id})
    }
    deleteContact(id){
        return this.http.post(this.baseURL+'api/deleteContact',{id})
    }
    searchContact(query){
        return this.http.post(this.baseURL+"api/search",{query})
    }
}