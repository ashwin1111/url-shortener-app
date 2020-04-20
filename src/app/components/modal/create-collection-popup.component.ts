import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../api.service';
import { Alert } from '../modal/alert.component';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from "@angular/router";

export interface DialogData {
    url_id: any;
}

@Component({
    selector: 'create-collection-popup',
    templateUrl: 'create-collection-popup.html'
})
export class CreateCollectionPopup implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<CreateCollectionPopup>,
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private apiService: ApiService,
        private spinner: NgxSpinnerService,
        private router: Router
        ) { }

    url_id: any;
    name: any;
    title: any;
    description: any;
    short_url: any;

    onNoClick(): void {
        this.dialogRef.close();
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

    submit() {

        console.log('this.data.url_id',this.data.url_id);
        var urlIdCollection = '';
        this.data.url_id.forEach(element => {
            urlIdCollection += element + ','
        });
        urlIdCollection.substring(0, urlIdCollection.length - 1);

        var data = {
            name: this.name,
            title: this.title,
            description: this.description,
            url_id_collection: urlIdCollection
        };

        this.spinner.show();
        this.apiService.apiCall(this.apiService.getBaseUrl() + '/collections/create', data).then(res => {
            this.spinner.hide();
            console.log('res', res);
            if (Object(res).msg === 'Collection created') {
                // Success, redirect to collection list page
                this.onNoClick();
                this.router.navigate(['/list-collections']);
                
            } else {
                var data = {
                    text: 'Error in creating collection',
                    button: 'Close',
                    heading: 'Reason',
                    bigHeading: 'Creating Short Url failed'
                  }
                  this.openDialog(data);
            }
        })
    }

    ngOnInit() {
    }

}