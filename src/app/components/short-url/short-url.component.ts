import { Component, OnInit, Inject } from '@angular/core';
import { Router } from "@angular/router"
import { ApiService } from '../../api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppComponent } from '../../app.component';
import { NgxSpinnerService } from "ngx-spinner";

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
  ) { }

  bigUrl: any;
  urlOption: any;
  customShortUrl: any;
  shortUrl: any;
  data: any;
  isLoggedIn = false;

  openDialog(res): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '400px',
      height: '400px',
      data: { shortUrl: res.msg.short_url }
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
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
    console.log('res', res);
    if (Object(res).msg) {
      this.openDialog(res);
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

export interface DialogData {
  shortUrl: string;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html'
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  shortUrl: any;

  onNoClick(): void {
    this.dialogRef.close();
  }

  copyToClipboard(): void {
    console.log('this.shortUrl', this.data.shortUrl);
    var copyText = (document.getElementById("shortUrl") as HTMLInputElement);
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
  }

}