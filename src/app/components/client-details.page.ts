import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../models/client';
import { Comune } from '../models/comune';
import { Provincia } from '../models/provincia';
import { ClientDetailsService } from '../services/client-details.service';
import { ClientService } from '../services/client.service';
import { ComuniProvinceService } from '../services/comuni-province.service';

@Component({
  template: `
    <div class="myLista">
      <div class="titolo text-center">nuovo cliente</div>
      <form class="mt-5 container">
        <div class="miniForm">
          <h2 class="mySottotitolo">Informazioni personali</h2>
          <div class="form-row">
            <div class="form-group col">
              <label>Nome</label>
              <input
                type="text"
                [(ngModel)]="newCliente.nomeContatto"
                name="nomeContatto"
                class="form-control"
              />
            </div>
            <div class="form-group col">
              <label>Cognome</label>
              <input
                type="text"
                [(ngModel)]="newCliente.cognomeContatto"
                name="cognomeContatto"
                class="form-control"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col">
              <label>Ragione Sociale</label>
              <input
                type="text"
                [(ngModel)]="newCliente.ragioneSociale"
                name="ragioneSociale"
                class="form-control"
              />
            </div>
            <div class="form-group col">
              <label>Partita IVA</label>
              <input
                type="number"
                [(ngModel)]="newCliente.partitaIva"
                name="partitaIva"
                class="form-control"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col">
              <label>Email</label>
              <input
                type="email"
                [(ngModel)]="newCliente.email"
                name="email"
                class="form-control"
              />
            </div>
            <div class="form-group col">
              <label>PEC</label>
              <input
                type="email"
                [(ngModel)]="newCliente.pec"
                name="pec"
                class="form-control"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col">
              <label>Telefono Contatto</label>
              <input
                type="text"
                class="form-control"
                [(ngModel)]="newCliente.telefonoContatto"
                name="telefonoContatto"
                id="telefonoContattoInput"
              />
            </div>
            <div class="form-group col">
              <label>Email Contatto</label>
              <input
                type="email"
                class="form-control"
                [(ngModel)]="newCliente.emailContatto"
                name="emailContatto"
                id="emailContattoInput"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col">
              <label>Telefono</label>
              <input
                type="phone"
                [(ngModel)]="newCliente.telefono"
                name="telefono"
                class="form-control"
              />
            </div>
            <div class="form-group col">
              <label>Tipo Cliente</label>
              <select
                class="form-control"
                [(ngModel)]="newCliente.tipoCliente"
                name="ragioneSociale"
              >
                <option selected>...</option>
                <option>SRL</option>
                <option>SPA</option>
                <option>SAS</option>
                <option>PA</option>
              </select>
            </div>
          </div>
        </div>
      </form>

      <!--Sedi-->
      <!--Sede operativa-->
      <div class="form-row justify-content-around">
        <div class="col">
          <form class="mt-3 container">
            <h2 class="mySottotitolo">Sede operativa</h2>
            <div class="form-row">
              <div class="form-group">
                <label>Indirizzo</label>
                <input
                  type="text"
                  [(ngModel)]="newCliente.indirizzoSedeOperativa.via"
                  name="via"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Civico</label>
                <input
                  type="text"
                  [(ngModel)]="newCliente.indirizzoSedeOperativa.civico"
                  name="civico"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label>Cap</label>
                <input
                  type="number"
                  [(ngModel)]="newCliente.indirizzoSedeOperativa.cap"
                  name="cap"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Località</label>
                <input
                  type="text"
                  [(ngModel)]="newCliente.indirizzoSedeOperativa.localita"
                  name="localita"
                  class="form-control"
                />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Provincia</label>
                  <select
                    class="form-select"
                    [(ngModel)]="newCliente.indirizzoSedeOperativa.provincia"
                    (ngModelChange)="onChangeProvinciaOperativa($event)"
                    name="nome"
                    class="form-control"
                  >
                    <option selected>Seleziona Provincia</option>
                    <option *ngFor="let item of province" [ngValue]="item">
                      {{ item.nome }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Comune</label>
                <select
                  class="form-select"
                  [(ngModel)]="newCliente.indirizzoSedeOperativa.comune"
                  name="nome"
                  class="form-control"
                >
                  <option selected>Seleziona Comune</option>
                  <option
                    *ngFor="let item of comuniSedeOperativa"
                    [ngValue]="item"
                  >
                    {{ item.nome }}
                  </option>
                </select>
              </div>
            </div>
          </form>
        </div>
        <!--Sede legale-->
        <div class="col">
          <form class="mt-3 container">
            <h2 class="mySottotitolo">Sede legale</h2>
            <div class="form-row">
              <div class="form-group">
                <label>Indirizzo</label>
                <input
                  type="text"
                  [(ngModel)]="newCliente.indirizzoSedeLegale.via"
                  name="via"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Civico</label>
                <input
                  type="text"
                  [(ngModel)]="newCliente.indirizzoSedeLegale.civico"
                  name="civico"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label>Cap</label>
                <input
                  type="number"
                  [(ngModel)]="newCliente.indirizzoSedeLegale.cap"
                  name="cap"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Località</label>
                <input
                  type="text"
                  [(ngModel)]="newCliente.indirizzoSedeLegale.localita"
                  name="localita"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Provincia</label>
                <select
                  class="form-select"
                  [(ngModel)]="newCliente.indirizzoSedeLegale.provincia"
                  (ngModelChange)="onChangeProvinciaLegale($event)"
                  name="nome"
                  class="form-control"
                >
                  <option selected>Seleziona Provincia</option>
                  <option *ngFor="let item of province" [ngValue]="item">
                    {{ item.nome }}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Comune</label>
                <select
                  class="form-select"
                  [(ngModel)]="newCliente.indirizzoSedeLegale.comune"
                  name="nome"
                  class="form-control"
                >
                  <option selected>Seleziona Comune</option>
                  <option
                    *ngFor="let item of comuniSedeLegale"
                    [ngValue]="item"
                  >
                    {{ item.nome }}
                  </option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              class="btn btnCheck col my-3"
              (click)="addCliente(newCliente)"
            >
              <i class="bi bi-check"></i>
            </button>
            <button
              type="button"
              class="btn btnRosso col my-3 ms-3"
              [routerLink]="['/clienti']"
              title="Annulla"
            >
            <i class="bi bi-x"></i>

            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ClientDetailsPage implements OnInit {
  constructor(
    private dettClienteSrv: ClientDetailsService,
    private comProvSrv: ComuniProvinceService,
    private router: Router,
    private clientSrv: ClientService,
  ) {}

  tipiClienti: any;
  comuniSedeLegale!: Comune[];
  comuniSedeOperativa!: Comune[];
  province!: Provincia[];
  response: any;
  idCitta: any;
  provincia1!: string;
  provincia2!: string;

  newCliente: Cliente = new Cliente();

  ngOnInit(): void {
    this.dettClienteSrv.getTipiCliente().subscribe((c) => {
      this.tipiClienti = c;
    });
    this.comProvSrv.getAllProvince(0).subscribe((c) => {
      console.log(c);
      this.province = (c as any).content;
    });
    this.comProvSrv.getAllComuni(0).subscribe((c) => {
      console.log('c', c);
      this.comuniSedeLegale = (c as any).content;
      this.comuniSedeOperativa = (c as any).content;
    });

  }

  onChangeProvinciaLegale(event: Provincia) {

    this.comProvSrv.getAllComuni(0).subscribe((c) => {
      this.comuniSedeLegale = ((c as any).content as any[]).filter(
        (comune) => comune.provincia.id === event.id
      );
    });
  }

  onChangeProvinciaOperativa(event: Provincia) {

    this.comProvSrv.getAllComuni(0).subscribe((c) => {
      this.comuniSedeOperativa = ((c as any).content as any[]).filter(
        (comune) => comune.provincia.id === event.id
      );
    });
  }

  addCliente(newCliente: Cliente) {
    this.clientSrv.createCliente(newCliente).subscribe((res) => {
      this.router.navigate(['/clienti']);
    });
  }
}
