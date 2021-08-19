import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../App-Services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css'],
})
export class AppNavComponent implements OnInit, OnDestroy {
  isAutherised: boolean = false;
  fetchEnable: boolean = false;
  userSub: Subscription;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAutherised = user ? true : false;
      this.fetchEnable =
        this.isAutherised && user.email === 'er.aashishgaur@gmail.com'
          ? true
          : false;
    });
  }

  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/authenticate']);
    this.isAutherised = false;
    this.fetchEnable = false;
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
