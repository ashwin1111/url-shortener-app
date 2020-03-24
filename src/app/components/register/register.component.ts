import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import { ApiService } from '../../api.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(
    private router: Router,
    private apiService: ApiService,
    private spinner: NgxSpinnerService
  ) { }
  name: any;
  email: any;
  password: any;

  signup() {
    this.spinner.show();
    if ((this.name !== '' && this.name !== undefined) && (this.email !== '' && this.email !== undefined) && (this.password !== '' && this.password !== undefined)) {
      var data = {
        name: this.name,
        email: this.email,
        password: this.password
      };

      var baseUrl = this.apiService.getBaseUrl();

      this.apiService.apiCall(baseUrl + '/auth/register', data).then(res => {
        console.log(res);
        if (Object(res).auth === true && Object(res).msg === 'User registered successfully') {
          this.router.navigate(['/login'])
        } else {
          // there was a problem while registering the user
          // todo: add condition for showing existing user
        }
        this.spinner.hide();
      });
    } else {
      // please enter all required fields
      this.spinner.hide();
    }
  }

  ngOnInit() {
  }

}