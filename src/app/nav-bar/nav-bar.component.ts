import { Component, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
})
export class NavBarComponent {
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.isLoggedIn = this.authService.isLoggedIn();

   
    this.cdr.detectChanges();

    this.subscriptions.push(
      this.authService.isAdmin$.subscribe((isAdmin) => {
        this.isAdmin = isAdmin;
        this.cdr.detectChanges(); 
      })
    );

    this.subscriptions.push(
      this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
        this.cdr.detectChanges(); 
      })
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}