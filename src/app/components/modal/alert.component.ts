import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    text: string;
    button: string;
    heading: string;
    bigHeading: string;
}

@Component({
    selector: 'alert',
    templateUrl: 'alert.html'
})
export class Alert implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<Alert>,
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    text: any;
    button: any;
    heading: any;
    bigHeading: any;

    onNoClick(): void {
        this.dialogRef.close();
    }

    copyToClipboard(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
    }

}