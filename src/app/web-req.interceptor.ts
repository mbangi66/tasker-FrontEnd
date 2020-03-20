import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError,tap,switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebRequestInterceptor implements HttpInterceptor {
  
  refreshingAccessToken :boolean;

  accessTokenRefreshed:Subject<any> = new Subject();
  
  constructor(private authService:AuthService) { }

  intercept(req:HttpRequest<any>, next:HttpHandler):Observable<any> {
    //Handle the Request
    req = this.addAuthHeader(req);
    //Call next and Handel he Error
    return next.handle(req).pipe(
      catchError((err:HttpErrorResponse)=>{
        if(err.status === 401){
          return this.refreshAccessToken().pipe(
            switchMap(()=>{
              req = this.addAuthHeader(req);
              return next.handle(req)
            }),catchError((err:any)=>{
              console.log(err),
              this.authService.logout();
              return empty();
            })
          )
        }
        return throwError(err);
      })
    )
  }

  refreshAccessToken(){
    if(this.refreshingAccessToken){
      return new Observable(observer =>{
        this.accessTokenRefreshed.subscribe(()=>{
          observer.next();
          observer.complete();
        })
      })
    }else{
      this.refreshingAccessToken = true;
    return this.authService.getNewAccessToken().pipe(
      tap(()=>{
        this.refreshingAccessToken = false;
        this.accessTokenRefreshed.next()
        console.log('Access Token Refreshed')
      })
    )
    }
    
  }

  addAuthHeader(req:HttpRequest<any>){
    //Get AccessToken
    const token =  this.authService.getAccessToken()
    if(token){
    //append AccessToken in Header
    return req.clone({
      setHeaders:{
        'access-Token':token 
      }
    })
    }
    return req;
  }
}
