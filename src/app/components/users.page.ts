import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { ClientService } from '../services/client.service';

@Component({
  template: `
    <div class="myLista">
      <div class="container">
        <div class="titolo text-center">lista utenti</div>
        <table class="table tabella shadow">
          <thead class="myTitoletto">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Roles</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let utente of utenti; let i = index">
              <th scope="row">{{ utente.id }}</th>
              <td><b>{{ utente.username }}</b></td>
              <td>{{ utente.email }}</td>
              <td *ngFor="let item of utente.roles">{{ item.roleName }}</td>
            </tr>
          </tbody>
        </table>

        <nav aria-label="Page navigation" class="col-md-6">
          <ul class="pagination">
            <li class="page-item" *ngIf="!response.first">
              <a class="page-link" (click)="cambiaPag(response.number - 1)"
                ><i class="bi bi-caret-left"></i
              ></a>
            </li>
            <li class="page-item" *ngFor="let pag of numP; let p = index">
              <a class="page-link" (click)="cambiaPag(p)">{{ p + 1 }}</a>
            </li>
            <li class="page-item" *ngIf="!response.last">
              <a class="page-link" (click)="cambiaPag(response.number + 1)"
                ><i class="bi bi-caret-right"></i
              ></a>
            </li>
            <a
              class="btn myBtn ms-3"
              [routerLink]="['/dettagliCliente']"
              routerLinkActive="active"
              title="Nuovo cliente"
              ><i class="bi bi-person-plus"></i>
            </a>
          </ul>
        </nav>
      </div>
    </div>
  `,
  styles: [],
})
export class UsersPage implements OnInit {
  constructor(private authSrv: AuthService, private clientSrv: ClientService) {}

  utenti!: Array<User>;
  numP: any;
  response: any;
  pagCorr: number = 0;

  cambiaPag(page: number) {
    this.authSrv.getAll(page).subscribe((c) => {
      this.response = c;
      this.utenti = this.response.content;
      this.pagCorr = page;
    });
  }

  ngOnInit() {
    this.authSrv.getAll(0).subscribe((c) => {
      this.response = c;
      this.utenti = this.response.content;
      const numP = Array(this.response.totalPages);
      this.numP = numP;
    });
  }
}
