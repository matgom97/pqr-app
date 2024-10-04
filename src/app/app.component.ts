import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavBarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Debe ser styleUrls, no styleUrl
})
export class AppComponent {
  title = 'pqrApp';
}