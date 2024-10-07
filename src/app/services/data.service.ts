import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Product } from "../models/product.model";
import { environment } from "../../environments/environments";
import { SecurityUtil } from "../utils/security.utils";

@Injectable({
    providedIn: 'root',
})
export class DataService {
    constructor(private httpClient: HttpClient){}

    public url = "http://localhost:3000/v1"

    composeHeaders(){
        const token = SecurityUtil.getToken();
        const headers = new HttpHeaders().set('Authorization', `bear ${token}`);
        return headers;
    }

    getProducts(){
        return this.httpClient.get<Product[]>(`${this.url}/products`);
    }

    authenticate(data: any){
        return this.httpClient.post(`${this.url}/accounts/authenticate`, data)
    }

    refreshToken() {
        return this.httpClient.post(`${this.url}/accounts/refresh-token`, null, { headers: this.composeHeaders()})
    }

    create(data: any){
        return this.httpClient.post(`${this.url}/accounts`, data);
    }

    resetPassword(data: any){
        return this.httpClient.post(`${this.url}/accounts/reset-password`, data);
    }

    getProfile(){
        return this.httpClient.get(`${this.url}/accounts`, {headers:this.composeHeaders()})
    }

    updateProfile(data : any){
        return this.httpClient.put(`${this.url}/accounts`, data, {headers: this.composeHeaders()})
    }
}