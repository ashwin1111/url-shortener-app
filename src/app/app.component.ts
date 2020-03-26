import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedIn = false;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  logout() {
    localStorage.removeItem('x-access-token');
    this.router.navigate(['/login']);
    this.loggedIn = false;
  }

  refreshAppComponent() {
    if (localStorage.getItem('x-access-token') !== null) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
    this.cdr.detectChanges();
    return this.loggedIn;
  }

  ngOnInit() {
    if (localStorage.getItem('x-access-token') !== null) {
      this.loggedIn = true;
    }
  }
}
