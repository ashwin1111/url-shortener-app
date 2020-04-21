import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertComponent } from '../modal/alert.component';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(
    private router: Router,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
  ) { }
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

  login(): void {
    let data;
    this.spinner.show();
    if ((this.email !== '' && this.email !== undefined) && (this.password !== '' && this.password !== undefined)) {
      data = {
        email: this.email,
        password: this.password
      };

      this.apiService.apiCall(this.apiService.getBaseUrl() + '/auth/login', data).then(res => {
        if (Object(res).auth === true && Object(res).msg === 'Login success :)') {
          localStorage.setItem('x-access-token', Object(res).token);
          this.router.navigate(['/short-url']);
        } else if (Object(res).error.msg === 'Account not verified') {
          data = {
            text: 'Account not verified, please check your email for confirmation email',
            button: 'Close',
            heading: 'Reason',
            bigHeading: 'Login failed :('
          };
          this.openDialog(data);
        } else if (Object(res).error.msg === 'No user found with the given email / password') {
          data = {
            text: 'No user found with the given email / password',
            button: 'Close',
            heading: 'Reason',
            bigHeading: 'Login failed :('
          };
          this.openDialog(data);
        } else if (Object(res).error.msg === 'Email / Password is wrong') {
          data = {
            text: 'Email / Password is wrong',
            button: 'Close',
            heading: 'Reason',
            bigHeading: 'Login failed :('
          };
          this.openDialog(data);
        } else {
          data = {
            text: 'There was a problem while logging in the user',
            button: 'Close',
            heading: 'Reason',
            bigHeading: 'Login failed :('
          };
          this.openDialog(data);
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
