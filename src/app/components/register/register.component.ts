import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router"
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService
  ) { }
  name: any;
  email: any;
  password: any;

  signup() {
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
        }
      });
    } else {
      // please enter all required fields
    }
  }

  ngOnInit() {
  }

}