import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from'rxjs/operators'
import { User } from '../_models/user';

//Injectable - can be injected into other components or services.
//Services are singleton, once initialized stay until end of app.
//Components are destroyed as soon as they are not in use.
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';

  
  //ReplaySubject is kind of buffer object, it emits last subscribed value or certain number of values
  private currentUserSource = new ReplaySubject<User>(1);
  //Declared observable
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any)
  {
    //model is a body of post request
    //Anything inside the pipe is RxJS operator
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(model: any)
  {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  loggout()
  {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
