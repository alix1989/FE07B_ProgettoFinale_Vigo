import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../models/client';
import { ClientService } from '../services/client.service';
import { FatturaService } from '../services/fattura.service';

@Component({
  template: `
  <div class="myLista">
    <div class="mt-5 container">
      <div class="titolo text-center">nuova fattura</div>
    <form #form="ngForm" (ngSubmit)="crea(form)">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title text-center">{{ cliente.ragioneSociale }}</h5>
          <h5 class="card-subtitle mb-2 text-muted text-center">
            {{ cliente.nomeContatto }} {{ cliente.cognomeContatto }}
          </h5>
          <div class="m-2">
            <label class="card-text " for="importo">Importo: </label>
            <input
              type="number"
              id="importo"
              [(ngModel)]="form.value.importo"
              name="importo"
              class="form-control"
            />
          </div>
          <label class="card-text m-2">
            Stato Fattura :
            <select name="stato" id="stato" ngModel class="form-select">
              <option value=""></option>
              <option value="2">PAGATA</option>
              <option value="1">NON PAGATA</option>
            </select>
          </label>
          <div class="m-2">
            <label class="card-text" for="numFatt">Numero fattura: </label>
            <input
              type="number"
              id="numFatt"
              [(ngModel)]="form.value.numFatt"
              name="numFatt"
              class="form-control"
            />
          </div>
          <div class="m-2">
            <label class="card-text">Data :</label>
            <input
              type="date"
              class="form-control"
              [(ngModel)]="form.value.data"
              name="data"
            />
          </div>
          <div class="d-flex mt-5 justify-content-evenly">
            <button type="submit" class="btn btn-success">Crea</button>
          </div>
        </div>
      </div>

    </form>
</div></div>
  `,
  styles: [
    `
    `
  ],
})
export class FatturaNewPage implements OnInit {
  constructor(
    private clientSrv: ClientService,
    private route: ActivatedRoute,
    private fatturaSrv: FatturaService,
    private router: Router
  ) {}

  id!: number;
  cliente!: Cliente;
  response: any;
  nuovaFattura: any;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.clientSrv.getById(this.id).subscribe((res) => {
        this.response = res;
        this.cliente = this.response;
      });
    });
  }

  crea(form: any) {
    this.nuovaFattura = {
      id: 0,
      numero: 0,
      anno: 0,
      importo: 0,
      data: '',
      stato: { id: 0, nome: '' },
      cliente: {},
    };

    this.nuovaFattura.data = form.value.data;
    this.nuovaFattura.anno = this.nuovaFattura.data.slice(0, 4);
    this.nuovaFattura.importo = form.value.importo;
    this.nuovaFattura.numero = form.value.numFatt;
    this.nuovaFattura.stato.id = form.value.stato;
    this.nuovaFattura.cliente.id = this.cliente.id;
    this.fatturaSrv.newFattura(this.nuovaFattura).subscribe();
    this.router.navigate(['/clienti']);
  }
}
