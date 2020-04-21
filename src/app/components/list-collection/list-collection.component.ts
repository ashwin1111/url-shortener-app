import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from '../../api.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-list-collection',
  templateUrl: './list-collection.component.html',
  styleUrls: ['./list-collection.component.css']
})
export class ListCollectionComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    public myapp: AppComponent
  ) { }

  urlList: any;

  ngOnInit(): void {
    if (this.myapp.refreshAppComponent() === true) {
      this.spinner.show();
      this.apiService.getApiCall(this.apiService.getBaseUrl() + '/collections/my_collections/all').then(res => {
        this.urlList = Object(res).collections;
        this.spinner.hide();
      }).catch(err => {
        this.spinner.hide();
      })
    } else {
      this.router.navigate(['/login']);
    }
  }

}
