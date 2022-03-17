import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpService } from '../services/signup.service';

@Component({
  template: `
  <div class="esternoForm container-fluid text-center">
  <div class="titolo">signup</div>
     <div class="mySignup text-center">
      <div class="row justify-content-center">
        <div class="col-6">
          <form #form="ngForm" (ngSubmit)="onsignup(form)">
            <div class="form-group mt-2">
              <label for="username">username</label>
              <input
              placeholder="username personale"
                ngModel
                name="username"
                class="form-control"
                type="username"
                id="username"
              />
            </div>
            <div class="form-group mt-2">
              <label for="email">e-mail</label>
              <input
              placeholder="nome@dominio.com"
                ngModel
                name="email"
                class="form-control"
                type="email"
                id="email"
              />
            </div>
            <div class="form-group mt-2">
              <label for="password">password</label>
              <input
              placeholder="minimo 6 caratteri!"
                ngModel
                name="password"
                class="form-control"
                type="password"
                id="password"
              />
            </div>
            <div class="container">
              <p class="mt-3">ruolo:</p>
              <select
                ngModel
                name="ruolo"
                class="form-select"
                aria-label="Default select example"
              >
                <option selected></option>
                <option value="ROLE_USER">Utente</option>
                <option value="ROLE_ADMIN">Amministratore</option>
              </select>
            </div>
            <button
              class="btn myBtn m-3"
              [disabled]="false"
              type="submit"
            >
              Registrati!
            </button>
          </form>
        </div>
      </div>
    </div>
</div>
  `,
  styles: [
    `

    `
  ]
})
export class SignupPage implements OnInit {
  user = {
    username: "",
    email: "",
    password: "",
    role: []
  };
  constructor(private signSrv: SignUpService, private router:Router) {}

  ngOnInit(): void {}

  onsignup(form:NgForm) {
    this.signSrv.signup(form.value).subscribe(res=>{
      alert('Registrazione avvenuta!')
      this.router.navigate(['/login']);
    }, err => {
      alert(`Errore nella registrazione: ${err.error.error}`);


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


