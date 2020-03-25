import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-verified',
  templateUrl: './verified.component.html',
  styleUrls: ['./verified.component.css']
})
export class VerifiedComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2500);
  }

}
