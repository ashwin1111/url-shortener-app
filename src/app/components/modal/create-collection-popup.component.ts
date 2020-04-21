import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../api.service';
import { AlertComponent } from '../modal/alert.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

export interface DialogData {
    urlIds: any;
}

@Component({
    selector: 'app-create-collection-popup',
    templateUrl: 'create-collection-popup.html'
})
export class CreateCollectionPopupComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<CreateCollectionPopupComponent>,
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private apiService: ApiService,
        private spinner: NgxSpinnerService,
        private router: Router
    ) {
        this.apiCallInProgress = true;
        this.collectionNameUpdate.pipe(
            debounceTime(1200),
            distinctUntilChanged())
            .subscribe(value => {
                if (value.length > 0) {
                    this.apiCallInProgress = true;
                    this.checkAvailability(value);
                }
            });
    }

    collectionNameUpdate = new Subject<string>();
    urlIds: any;
    name: any;
    title: any;
    description: any;
    shortUrls: any;
    isAvailable = false;
    apiCallInProgress = false;

    checkAvailability(input) {
        const data = {
            collectionName: input
        };

        this.apiCallInProgress = false;
        this.spinner.show();
        this.apiService.apiCall(this.apiService.getBaseUrl() + '/collections/availability', data).then(res => {
            this.spinner.hide();
            if (Object(res).availability === true) {
                this.isAvailable = true;
            } else {
                this.isAvailable = false;
            }
        });
    }


    onNoClick(): void {
        this.dialogRef.close();
    }

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

    submit() {
        let urlIdCollection = '';
        this.data.urlIds.forEach(element => {
            urlIdCollection += element + ',';
        });
        urlIdCollection.substring(0, urlIdCollection.length - 1);

        const data = {
            name: this.name,
            title: this.title,
            description: this.description,
            url_id_collection: urlIdCollection
        };

        this.spinner.show();
        this.apiService.apiCall(this.apiService.getBaseUrl() + '/collections/create', data).then(res => {
            this.spinner.hide();
            if (Object(res).msg === 'Collection created') {
                // Success, redirect to collection list page
                this.onNoClick();
                this.router.navigate(['/list-collections']);

            } else {
                const data2 = {
                    text: 'Error in creating collection',
                    button: 'Close',
                    heading: 'Reason',
                    bigHeading: 'Creating Short Url failed'
                };
                this.openDialog(data2);
            }
        });
    }

    ngOnInit() {
    }

}
