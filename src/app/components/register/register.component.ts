import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { ApiService } from '../../api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alert } from '../modal/alert.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(
    private router: Router,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
  ) { }
  name: any;
  email: any;
  password: any;

  openDialog(values): void {
    const dialogRef = this.dialog.open(Alert, {
      width: '400px',
      height: '400px',
      data: { 
        text: values.text,
        button: values.button,
        heading: values.heading,
        bigHeading: values.bigHeading
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      // console.log('The dialog was closed');
    });
  }

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
        this.name = null;
        this.email = null;
        this.password = null;
        if (Object(res).auth === true && Object(res).msg === 'User registered successfully') {
          var data = {
            text: 'Check your email to verify your account',
            button: 'Close',
            heading: 'TODO',
            bigHeading: 'Registered successfully :)'
          }
          this.openDialog(data);
          this.router.navigate(['/login']);
        } else if (Object(res).error.msg === 'Email already exists') {
          var data = {
            text: 'Email already exists',
            button: 'Close',
            heading: 'Reason',
            bigHeading: 'Registration failed :('
          }
          this.openDialog(data);
        } else if (Object(res).error.msg === 'Email badly formatted') {
          var data = {
            text: 'Email badly formatted',
            button: 'Close',
            heading: 'Reason',
            bigHeading: 'Registration failed :('
          }
          this.openDialog(data);
        } else {
          var data = {
            text: 'There was a problem while registering the user',
            button: 'Close',
            heading: 'Reason',
            bigHeading: 'Registration failed :('
          }
          this.openDialog(data);
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