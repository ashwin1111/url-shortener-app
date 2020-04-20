import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from '../../api.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.show();
    this.route.snapshot.paramMap.get('name');
    console.log(this.route.snapshot.paramMap.get('name'));
    this.apiService.getApiCall(this.apiService.getBaseUrl() + '/collections/list/' + this.route.snapshot.paramMap.get('name')).then(res => {
      console.log(res);
      this.urlList = Object(res).collections;
      this.collectionDescription = Object(res).collections[0].collection_description;
      this.collectionTitle =  Object(res).collections[0].collection_title;
      this.spinner.hide();
    }).catch(err => {
      console.log(err);
      this.spinner.hide();
    })
  }

  urlList: any;
  collectionTitle: any;
  collectionDescription: any;

  magic() {
    console.log(this.urlList);
    this.urlList.forEach(element => {
      window.open(element.big_url, '_blank');
    });
  }

  ngOnInit(): void {
  }

}
