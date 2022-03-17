import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  template: `

  <div class="container-fluid esternoForm text-center">
    <div class="titolo">login</div>
    <form class="myLogin shadow" #form="ngForm" (ngSubmit)="login(form)">
      <div class="mb-3">
        <label for="username">username <span class="obbligatorio">*</span></label>
        <input
          type="text"
          id="username"
          class="form-control"
          ngModel
          name="username"
        />
      </div>
      <div class="mb-3">
        <label for="password">password <span class="obbligatorio">*</span></label>
        <input
          type="password"
          id="password"
          class="form-control"
          ngModel
          name="password"
        />
      </div>
      <div>
        <button type="submit" class="btn myBtn">entra</button>
      </div>
    </form>
</div>
  `,
  styles: [
  `

  `
  ]
})
export class LoginPage implements OnInit {
  constructor(private authSrv: AuthService, private router: Router) {}

  item!: any;
  users!: User;

  ngOnInit(): void {}

  login(form: NgForm) {
    this.item = form.value;
    this.authSrv.login(this.item).subscribe((res) => {
      this.users = res;
      localStorage.setItem('utente', JSON.stringify(this.users));
      this.router.navigate(['']);
    }, err => {
      alert(`Errore nel login: ${err.error.error}`);


      switch(err.status) {
        case 400:
          alert(`Inserire i dati corretti`);
          break;
        case 401:
          alert(`Errore nelle credenziali`);
          break;
}
    });
  }
}

