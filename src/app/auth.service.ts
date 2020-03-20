import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaderResponse } from '@angular/common/http';
import { WebRequestService } from './web-request.service';
import { Router } from '@angular/router';
import { shareReplay,tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private webService:WebRequestService ,private router:Router,private http:HttpClient) { }

  login(email:string,password:string){
    return this.webService.login(email,password).pipe(
      shareReplay(),
      tap((res:HttpResponse<any>)=>{
        this.setSession(res.body._id,res.headers.get('access-Token'),res.headers.get('refresh-Token'))
        console.log("LOGGED IN!");
      })
    )
  }

  logout(){
    return this.removeSession(),
          this.router.navigate(['/login'])
  }

  private setSession(userId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('access-Token', accessToken);
    localStorage.setItem('refresh-Token', refreshToken);
  }

  private removeSession(){
    localStorage.removeItem('user-id')
    localStorage.removeItem('access-Token')
    localStorage.removeItem('refresh-Token')
  }

  getAccessToken(){
    return localStorage.getItem('access-Token');
  }

  getRefreshToken(){
    return localStorage.getItem('refresh-Token')
  }

  getUserId(){
    return localStorage.getItem('user-id')
  }

  setAccessToken(accessToken:string){
    localStorage.setItem('access-Token',accessToken)
  }

  getNewAccessToken(){
    return this.http.get(`${this.webService.ROOT_URL}/users/me/at`,{
      headers:{
        '_id':this.getUserId(),
        'refresh-Token': this.getRefreshToken()
      },
      observe:'response'
    }).pipe(
      tap((res:HttpResponse<any>)=>{
        this.setAccessToken(res.headers.get('access-Token'))
      })
    )
  }


  signUp(email:string,password:string){
    return this.webService.signUp(email,password).pipe(
      shareReplay(),
      tap((res:HttpResponse<any>)=>{
        this.setSession(res.body._id,res.headers.get('access-Token'),res.headers.get('refresh-Token'))
        console.log("Successfully SignUp!");
      })
    )
  }
  
}
