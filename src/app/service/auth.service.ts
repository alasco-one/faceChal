import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from "../type/User";
import { Credential } from "../type/Credential";




import { Subject } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authSubject : Subject<boolean>

  constructor(
    private http : HttpClient,
   ) {
	  this.authSubject = new Subject<boolean>()
   }

  /**
   * Methode qui permet d'enregistrer un nouveau user
   */
  signIn( user : User ) : Promise<boolean> {
    return new Promise<boolean>((resolve)=>{
      this.http.post<boolean>("api/sign-in", user)
        .subscribe((state) => resolve(state) )
    })

  }

  /**
   * Methode qui permet d'authentifier un user
   */
  signUp(form : Credential){
    this.http.post<User>("api/sign-up", form)
      .subscribe((user : User)=>{
        if(user.hasOwnProperty("firstName")){
          for (const key in user) {
            if (Object.prototype.hasOwnProperty.call(user, key)) {
              sessionStorage.setItem(key , user[key]);
            }
          }

          this.authSubject.next(true);
        }else{

          this.authSubject.next(false);

        }
      })
  }
}
