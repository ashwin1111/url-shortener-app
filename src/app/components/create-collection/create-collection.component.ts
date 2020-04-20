import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateCollectionPopup } from "../modal/create-collection-popup.component";

@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.css']
})
export class CreateCollectionComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    public collectionDialog: MatDialog
  ) { }

  bigUrl: any;
  shortUrl: any;
  urlList: any;
  idCollection = [];
  shortUrlCollection = [];
  color = '#DDBDF1';

  openDialog(): void {
    const dialogRef = this.collectionDialog.open(CreateCollectionPopup, {
      width: '100%',
      height: '100%',
      data: {
        url_id: this.idCollection,
        short_url: this.shortUrlCollection
      }
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  onCheckboxChange(event) {
    let split = event.element.value.split('|');
    event.element.value = split[0];
    if (event.checked === true) {
      this.shortUrlCollection.push(split[1]);
      this.idCollection.push(event.element.value);
    } else if (event.checked === false) {
      for (let i = 0; i < this.idCollection.length; i++) {
        if (this.idCollection[i] === event.element.value) {
          this.idCollection.splice(i, 1);
          this.shortUrlCollection.splice(i, 1);
        }
      }
    }
    console.log(this.idCollection, this.shortUrlCollection);
  }

  ngOnInit(): void {
    this.spinner.show();
    var baseUrl = this.apiService.getBaseUrl();
    this.apiService.apiCall(baseUrl + '/profile/url', '').then(res => {
      this.spinner.hide();
      this.urlList = Object(res).list;
    })
  }

}
