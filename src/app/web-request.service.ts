import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Config } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {
  readonly ROOT_URL;
  proxyurl = "https://task-manger-q.herokuapp.com/";
  constructor(private http:HttpClient ) { 
    this.ROOT_URL = "https://task-manger-q.herokuapp.com";
  }

  get(uri:string){
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  post(uri:string,payload:object){
    return this.http.post(`${this.ROOT_URL}/${uri}`,payload)
  }

  delete(uri:string){
    return this.http.delete(`${this.ROOT_URL}/${uri}`)
  }

  patch(uri:string,payload:object){
    return this.http.patch(`${this.ROOT_URL}/${uri}`,payload)
  }

  login(email:string,password:string): Observable<HttpResponse<Config>>{
    return this.http.post<Config>(`${this.ROOT_URL}/users/login`,{
      email,
      password
    },{observe:'response'})
  }
  signUp(email:string,password:string): Observable<HttpResponse<Config>>{
    return this.http.post<Config>(`${this.ROOT_URL}/users`,{
      email,
      password
    },{observe:'response'})
  }
}
