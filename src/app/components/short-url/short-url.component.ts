import { Component, OnInit, Inject } from '@angular/core';
import { Router } from "@angular/router"
import { ApiService } from '../../api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppComponent } from '../../app.component';


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
    public myapp: AppComponent
  ) { }

  bigUrl: any;
  urlOption: any;
  customShortUrl: any;
  name: any;
  animal: any;
  shortUrl: any;
  data: any;
  isLoggedIn = false;

  openDialog(res): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '400px',
      height: '400px',
      // res.msg.short_url
      data: { shortUrl: res.msg.short_url }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
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
    this.apiService.apiCall('https://short--url.herokuapp.com/url/' + validity + '/' + this.urlOption, this.data).then(res => {
      this.validateResult(res);
    });
  }

  shortenUrl(): void {
    if ((this.bigUrl !== '' && this.bigUrl !== undefined) && (this.urlOption !== '' && this.urlOption !== undefined)) {
      this.getPayloadData();
      if (localStorage.getItem('x-access-token') !== null) {
        this.createUrl('permanent');
      } else {
        this.createUrl('temporary');
      }
    } else {
      // please enter all required fields
    }
  }

  ngOnInit() {
    this.isLoggedIn = this.myapp.refreshAppComponent();
  }

}

export interface DialogData {
  animal: string;
  name: string;
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
  animal: string;
  name: string;
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