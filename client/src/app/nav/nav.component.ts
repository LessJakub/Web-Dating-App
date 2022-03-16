import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login () 
  {
    //login returns an observable so subscirbe is a must
    this.accountService.login(this.model).subscribe(response => {
        this.router.navigateByUrl('/members');
        console.log(response);
      }, error => {
        console.log(error);
        this.toastr.error(error.error);
      })
  }

  logout()
  {
    this.accountService.loggout();
    this.router.navigateByUrl('/');
  }

  //!! turns object into boolean, basicly checks if != null

}
