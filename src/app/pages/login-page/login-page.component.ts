import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Config } from 'protractor';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit() {
  }

  loginEvent(email:string,password:string){
    this.auth.login(email,password).subscribe((res:HttpResponse<Config>)=>{
      if(res.status == 200){
        this.router.navigate(['/lists']);
      }
      console.log(res);
    })
  }

}
