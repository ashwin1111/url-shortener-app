import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ApiService } from '../../api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertComponent } from '../modal/alert.component';

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
    const dialogRef = this.dialog.open(AlertComponent, {
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
    });
  }

  signup() {
    this.spinner.show();
    if (this.name && this.email && this.password && this.password) {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password
      };

      this.apiService.apiCall(this.apiService.getBaseUrl() + '/auth/register', data).then(res => {
        this.name = null;
        this.email = null;
        this.password = null;
        let data2;
        if (Object(res).auth === true && Object(res).msg === 'User registered successfully') {
          data2 = {
            text: 'Check your email to verify your account',
            button: 'Close',
            heading: 'TODO',
            bigHeading: 'Registered successfully :)'
          };
          this.openDialog(data2);
          this.router.navigate(['/login']);
        } else if (Object(res).error.msg === 'Email already exists') {
          data2 = {
            text: 'Email already exists',
            button: 'Close',
            heading: 'Reason',
            bigHeading: 'Registration failed :('
          };
          this.openDialog(data2);
        } else if (Object(res).error.msg === 'Email badly formatted') {
          data2 = {
            text: 'Email badly formatted',
            button: 'Close',
            heading: 'Reason',
            bigHeading: 'Registration failed :('
          };
          this.openDialog(data2);
        } else {
          data2 = {
            text: 'There was a problem while registering the user',
            button: 'Close',
            heading: 'Reason',
            bigHeading: 'Registration failed :('
          };
          this.openDialog(data2);
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
