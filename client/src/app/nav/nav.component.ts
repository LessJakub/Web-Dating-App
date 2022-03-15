import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

//Two way binding - data from component can be sent to client and data from client can be sent to component
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}

  //injecting account service into this component
  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

  login () 
  {
    //login returns an observable so subscirbe is a must
    this.accountService.login(this.model).subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      })
  }

  logout()
  {
    this.accountService.loggout();
  }

  //!! turns object into boolean, basicly checks if != null

}
