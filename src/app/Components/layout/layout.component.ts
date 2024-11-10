import { Component, Input, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LogoutService } from './logout.service';

interface MenuItem {
  label: string;
  route: string;
  icon?: string;
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    RouterOutlet,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  @Input() menuItems: MenuItem[] = [];

  constructor(private logoutService: LogoutService) {}

  logout() {
    console.log('loggin out');

    this.logoutService.logout();
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
