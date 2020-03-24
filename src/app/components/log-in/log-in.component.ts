import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { ApiService } from '../../api.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(
    private router: Router,
    private apiService: ApiService,
    private spinner: NgxSpinnerService
  ) { }
  email: any;
  password: any;

  login(): void {
    this.spinner.show();
    if ((this.email !== '' && this.email !== undefined) && (this.password !== '' && this.password !== undefined)) {
      var data = {
        email: this.email,
        password: this.password
      };

      var baseUrl = this.apiService.getBaseUrl();

      this.apiService.apiCall(baseUrl + '/auth/login', data).then(res => {
        console.log('res', res);
        if (Object(res).auth === true && Object(res).msg === 'Login success :)') {
          localStorage.setItem('x-access-token', Object(res).token);
          this.router.navigate(['/short-url']);
        } else {
          //incorrect pass
        }
        this.spinner.hide();
      });
    } else {
      this.spinner.hide();
      // please enter all required fields
    }
  }

  ngOnInit() {
    this.spinner.show();
    if (localStorage.getItem('x-access-token') !== null) {
      this.router.navigate(['/short-url']);
    }
    this.spinner.hide();
  }

}
