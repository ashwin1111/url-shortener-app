import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { ApiService } from '../../api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppComponent } from '../../app.component';
import { NgxSpinnerService } from "ngx-spinner";
import { DisplayShortUrl } from '../modal/display-short-url.component';
import { Alert } from '../modal/alert.component';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';


@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html',
  styleUrls: ['./short-url.component.css']
})

export class ShortUrlComponent implements OnInit {

  constructor(
    private router: Router,
    private apiService: ApiService,
    public dialog: MatDialog,
    public myapp: AppComponent,
    private spinner: NgxSpinnerService
  ) {
    this.customShortUrlUpdate.pipe(
      debounceTime(1200),
      distinctUntilChanged())
      .subscribe(value => {
        if (value.length > 0) {
          this.checkCustomUrl(value);
        }
      });
  }

  customShortUrlUpdate = new Subject<string>();
  bigUrl: any;
  urlOption: any;
  customShortUrl: any;
  shortUrl: any;
  data: any;
  isLoggedIn = false;
  isAvailable = false;

  checkCustomUrl (input) {
    var baseUrl = this.apiService.getBaseUrl();
    this.data = {
      customShortUrl: input
    };

    this.spinner.show();
    this.apiService.apiCall(baseUrl + '/url/availability', this.data).then(res => {
      if (Object(res).token === 'expired') {
        this.apiService.apiCall(baseUrl + '/auth/refresh_token', '').then(ress => {
          localStorage.setItem('x-access-token', Object(ress).token);
          this.checkCustomUrl(input);
        });
      } else {
        this.spinner.hide();
        if (Object(res).availability === true) {
          this.isAvailable = true;
        } else {
          this.isAvailable = false;
        }
      }
    });
  }

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
    });
  }

  showDialog(res): void {
    const dialogRef = this.dialog.open(DisplayShortUrl, {
      width: '400px',
      height: '400px',
      // res.msg.short_url
      data: { shortUrl: res.msg.short_url }
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  getPayloadData() {
    if (this.urlOption === 'random') {
      this.data = {
        url: this.bigUrl
      };
    } else {
      this.data = {
        url: this.bigUrl,
        customShortUrl: this.customShortUrl
      };
    }
  }

  validateResult(res) {
    if (Object(res).msg && Object(res).msg.short_url) {
      this.bigUrl = null;
      this.customShortUrl = null;
      this.showDialog(res);
    } else if (Object(res).error.msg === 'Internal error') {
      var data = {
        text: 'There was an error in creating short url',
        button: 'Close',
        heading: 'Reason',
        bigHeading: 'Creating Short Url failed :('
      }
      this.openDialog(data);
    } else if (Object(res).error.msg === 'Not a valid URL') {
      var data = {
        text: 'Please enter a valid URL',
        button: 'Close',
        heading: 'Reason',
        bigHeading: 'Creating Short Url failed :('
      }
      this.openDialog(data);
    }
  }

  createUrl(validity) {
    var baseUrl = this.apiService.getBaseUrl();
    this.apiService.apiCall(baseUrl + '/url/' + validity + '/' + this.urlOption, this.data).then(res => {
      if (Object(res).token === 'expired') {
        this.apiService.apiCall(baseUrl + '/auth/refresh_token', '').then(ress => {
          localStorage.setItem('x-access-token', Object(ress).token);
          this.createUrl(validity);
        });
      }
      this.spinner.hide();
      this.validateResult(res);
    });
  }

  shortenUrl(): void {
    this.spinner.show();
    if ((this.bigUrl !== '' && this.bigUrl !== undefined) && (this.urlOption !== '' && this.urlOption !== undefined)) {
      this.getPayloadData();
      if (localStorage.getItem('x-access-token') !== null) {
        this.createUrl('permanent');
      } else {
        this.createUrl('temporary');
      }
    } else {
      // please enter all required fields
      this.spinner.hide();
    }
  }

  ngOnInit() {
    this.isLoggedIn = this.myapp.refreshAppComponent();
  }

}