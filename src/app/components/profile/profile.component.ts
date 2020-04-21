import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateCollectionPopupComponent } from '../modal/create-collection-popup.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    public collectionDialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

}
