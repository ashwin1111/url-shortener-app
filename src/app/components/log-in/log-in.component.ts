import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(
    private router: Router,
    private apiService: ApiService
  ) { }
  email: any;
  password: any;

  login(): void {
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
        }
      });
    } else {
      // please enter all required fields
    }
  }

  ngOnInit() {
    if (localStorage.getItem('x-access-token') !== null) {
      this.router.navigate(['/short-url']);
    }
  }

}
