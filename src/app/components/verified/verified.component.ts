import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verified',
  templateUrl: './verified.component.html',
  styleUrls: ['./verified.component.css']
})
export class VerifiedComponent implements OnInit {

  msg: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    const event = this.route.snapshot.paramMap.get('event');
    if (event === 'verified') {
      this.msg = 'Thanks for Verifying your account :)';
      this.clearAndRedirect();
    } else if (event === 'session-expired') {
      this.msg = 'Session expired, please login again';
      this.clearAndRedirect();
    } else if (event === 'google-auth') {
      this.msg = 'Google login successful';
      const token = this.route.snapshot.paramMap.get('token');
      localStorage.setItem('x-access-token', token);
      this.router.navigate(['/short-url']);
    }
  }

  clearAndRedirect() {
    localStorage.clear();

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2500);
  }

  ngOnInit() {
  }

}
