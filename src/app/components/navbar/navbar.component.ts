import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLogged!: boolean;
  constructor(private router: Router) { }

  ngOnInit(): void {
  this.isLogged = localStorage.getItem('utente') !== null;
  }

  isLoggedUser(): boolean {
    return localStorage.getItem('utente') !== null;;
  }

  Logout() {
    this.router.navigate(['']);
    localStorage.removeItem('utente');
  }


}
