import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Config } from 'protractor';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit() {
  }
  signUpEvent(email:string,password:string){
    this.auth.signUp(email,password).subscribe((res:HttpResponse<Config>)=>{
      if(res.status == 200){
        this.router.navigate(['/lists']);
      }
      console.log(res);
    })
  }

}
