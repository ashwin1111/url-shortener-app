import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    shortUrl: string;
}

@Component({
    selector: 'display-short-url',
    templateUrl: 'display-short-url.html'
})
export class DialogOverviewExampleDialog implements OnInit {
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

    ngOnInit() {
        // this.isLoggedIn = this.myapp.refreshAppComponent();
      }

}