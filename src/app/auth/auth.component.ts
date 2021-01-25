import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';
import { AuthService } from '../service/auth.service';

interface Item{
  text : string,
  type : string,
}


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isAuth  = false
  authSubscription : Subscription

  messages  : Item[]

  show  = false

  index = 0

  active = 1
  constructor( private authService : AuthService ){
    this.authSubscription = authService.authSubject.subscribe((state)=>{
      this.isAuth = state;
      this.show = true
      this.index = (this.isAuth) ? 0 : 1
      setTimeout(()=>{
        this.show = false
      }, 3000)
      return ()=>{}
    })

    this.messages = [
      {
        text : "Welcome !",
        type : "success"
      },
      {
        text : "Email or password incorrect",
        type : "danger",
      },
      {
        text : "Registering done !",
        type : "success"
      },
      {
        text : "Registered abort!",
        type : "danger"
      }

    ]
  }
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if(this.authSubscription) this.authSubscription.unsubscribe();
  }
  signUp(f: NgForm) {

    this.authService.signUp(f.value)

  }
  signIn(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    //console.log(f.valid);  // false
    this.authService.signIn(f.value)
    .then((state)=>{

      if(state) {
        this.index = 2
        this.active = 1
      }
      else this.index = 3
      this.show = true

      setTimeout(()=>{
        this.show = false
      }, 5000)

    })
  }

}
