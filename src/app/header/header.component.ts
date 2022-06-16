import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  currentUserSubscription!: Subscription;
  currentUser!: User;

  title = 'CarSell';

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.currentUserSubscription = this.authService.currentUserSubject.subscribe({
      next: user => this.currentUser = <User>user,
      error: console.error,
    });
  }

  getTitle(): string {
    return this.title;
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

}
