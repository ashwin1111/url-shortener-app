import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateCollectionPopupComponent } from '../modal/create-collection-popup.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.css']
})
export class CreateCollectionComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    public collectionDialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.route.snapshot.paramMap.get('event');
    if (this.route.snapshot.paramMap.get('event') === 'create') {
      this.showCreateButton = true;
    }
  }

  bigUrl: any;
  shortUrl: any;
  urlList: any;
  idCollection = [];
  shortUrlCollection = [];
  color = '#DDBDF1';

  showCreateButton = false;

  openDialog(): void {
    if (this.shortUrlCollection.length > 0) {
      const dialogRef = this.collectionDialog.open(CreateCollectionPopupComponent, {
        width: '100%',
        height: '100%',
        data: {
          urlIds: this.idCollection,
          shortUrls: this.shortUrlCollection
        }
      });

      dialogRef.afterClosed().subscribe(() => {
      });
    }
  }

  onCheckboxChange(event) {
    const split = event.element.value.split('|');
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
  }

  ngOnInit(): void {
    this.spinner.show();
    this.apiService.apiCall(this.apiService.getBaseUrl() + '/profile/url', '').then(res => {
      this.spinner.hide();
      this.urlList = Object(res).list;
    });
  }

}
