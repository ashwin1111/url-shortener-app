import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-collections',
  templateUrl: './view-collections.component.html',
  styleUrls: ['./view-collections.component.css']
})
export class ViewCollectionsComponent implements OnInit {


  constructor( private apiService: ApiService,
    private spinner: NgxSpinnerService,
    public collectionDialog: MatDialog,
    private route: ActivatedRoute) {
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

