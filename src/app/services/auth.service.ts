import { Injectable } from '@angular/core';
import {UserSecurity} from '../shared/userSecurity'
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {map} from 'rxjs/operators';
import { ResetPassword } from '../shared/ResetPassword';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<UserSecurity>;
  public currentUser: Observable<UserSecurity>;

  constructor(private http: HttpClient,private router:Router) {
    this.currentUserSubject = new BehaviorSubject<UserSecurity>(
      JSON.parse(localStorage.getItem('currentUser'))
    );

    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): UserSecurity {
    return this.currentUserSubject.value;
  }

  login(auth) {
    return this.http.post<any>(environment.url_auth+'signin', auth).pipe(
      map((usertest) => {
        console.log('////////////' + usertest);
        if (usertest&& usertest.accessToken) {
          localStorage.setItem('currentUser', JSON.stringify(usertest));
          this.currentUserSubject.next(usertest);
        }
      })
    );
  }
  getUser() {
    return localStorage.getItem('currentUser');
  }
  loggedIn() {
    return !!this.getUser();
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['']);
  }
  resetpassword(email) {

    return this.http.post(environment.url_auth +`mpoublier`,email);
  }
  public resetPassword(resetPassword:ResetPassword): Observable<string>{
    return this.http.post<string>(environment.url_auth+`resetPassword`,resetPassword) ;
  }


}
