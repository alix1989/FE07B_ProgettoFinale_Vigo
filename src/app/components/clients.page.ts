import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from '../models/client';
import { ClientService } from '../services/client.service';

@Component({
  template: `
    <div class="myLista">
      <div class="container">
        <div class="titolo text-center">lista clienti</div>
        <div class="mb-3 text-center">
          <input
            id="searchbar"
            [(ngModel)]="ricerca"
            type="text"
            name="search"
            placeholder="Cerca per Ragione Sociale"
            class="ms-3"
          />
        </div>
        <table class="table tabella shadow">
          <thead class="myTitoletto">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Ragione sociale</th>
              <th scope="col">Email</th>
              <th scope="col">Partita Iva</th>
            </tr>
          </thead>
          <tbody *ngFor="let cliente of getClientiFiltrati(); let i = index">
            <tr>
              <th scope="row">{{ cliente.id }}</th>
              <td>{{ cliente.ragioneSociale }}</td>
              <td>{{ cliente.email }}</td>
              <td>{{ cliente.partitaIva }}</td>
              <td>
                <button
                  class="btn btnAzzurro"
                  [routerLink]="['/fatture-cliente', cliente.id]"
                  title="Fatture cliente"
                >
                  <i class="bi bi-cash-coin"></i>
                </button>
              </td>

              <td>
                <button
                  class="btn btnGiallo"
                  title="Dettagli cliente"
                  (click)="apri(mymodalDettagli)"
                >
                  <i class="bi bi-receipt"></i>
                </button>

                <ng-template #mymodalDettagli let-modal>
                  <div class="modal-header">
                    <h4 class="modal-title" id="modal-basic-title">
                      Dettagli Cliente n° {{ cliente.id }}
                    </h4>
                    <button
                      type="button"
                      class="close"
                      aria-label="Close"
                      (click)="modal.dismiss('Cross click')"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>

                  <div class="modal-body">
                    <table class="table">
                      <tbody>
                        <tr>
                          <td><strong>Ragione sociale:</strong></td>
                          <td>{{ cliente.ragioneSociale }}</td>
                        </tr>
                        <tr>
                          <td><strong>Partita Iva:</strong></td>
                          <td>{{ cliente.partitaIva }}</td>
                        </tr>
                        <tr>
                          <td><strong>Tipo Cliente:</strong></td>
                          <td>{{ cliente.tipoCliente }}</td>
                        </tr>
                        <tr>
                          <td><strong>Indirizzo e-mail:</strong></td>
                          <td>{{ cliente.email }}</td>
                        </tr>
                        <tr>
                          <td><strong>Indirizzo pec:</strong></td>
                          <td>{{ cliente.pec }}</td>
                        </tr>
                        <tr>
                          <td><strong>Numero di telefono:</strong></td>
                          <td>{{ cliente.telefono }}</td>
                        </tr>
                        <tr>
                          <td><strong>Nome e cognome contatto:</strong></td>
                          <td>
                            {{ cliente.nomeContatto }}
                            {{ cliente.cognomeContatto }}
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Numero di telefono contatto:</strong></td>
                          <td>{{ cliente.telefonoContatto }}</td>
                        </tr>
                        <tr>
                          <td><strong>Indirizzo e-mail contatto:</strong></td>
                          <td>{{ cliente.emailContatto }}</td>
                        </tr>
                        <tr>
                          <td><strong>Indirizzo sede operativa:</strong></td>
                          <table>
                            <tr>
                              {{
                                cliente.indirizzoSedeOperativa.via
                              }},
                              {{
                                cliente.indirizzoSedeOperativa.civico
                              }}
                            </tr>
                            <tr>
                              {{
                                cliente.indirizzoSedeOperativa.cap
                              }},
                              {{
                                cliente.indirizzoSedeOperativa.localita
                              }}
                            </tr>
                            <tr>
                              {{
                                cliente.indirizzoSedeOperativa.comune.nome
                              }},
                              {{
                                cliente.indirizzoSedeOperativa.comune.provincia
                                  .nome
                              }}
                            </tr>
                          </table>
                        </tr>

                        <tr>
                          <td><strong>Indirizzo sede legale:</strong></td>
                          <table>
                            <tr>
                              {{
                                cliente.indirizzoSedeLegale.via
                              }},
                              {{
                                cliente.indirizzoSedeLegale.civico
                              }}
                            </tr>
                            <tr>
                              {{
                                cliente.indirizzoSedeLegale.cap
                              }},
                              {{
                                cliente.indirizzoSedeLegale.localita
                              }}
                            </tr>
                            <tr>
                              {{
                                cliente.indirizzoSedeLegale.comune.nome
                              }},
                              {{
                                cliente.indirizzoSedeLegale.comune.provincia
                                  .nome
                              }}
                            </tr>
                          </table>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="modal-footer">
                    <button
                      class="btn btnGiallo"
                      title="Modifica cliente"
                      [routerLink]="['/edit-cliente', cliente.id]"
                      (click)="modal.close('Save click')"
                    >
                      <i class="bi bi-pencil-square"></i>
                    </button>

                    <button
                      type="button"
                      class="btn btnAzzurro"
                      (click)="modal.close('Save click')"
                      title="Torna Indietro"
                    >
                      <i class="bi bi-arrow-90deg-left"></i>
                    </button>
                  </div>
                </ng-template>
              </td>

              <td>
                <button
                  class="btn btnRosso shake-little"
                  title="Elimina Fattura"
                  (click)="apri(mymodal)"
                >
                  <i class="bi bi-trash"></i>
                </button>

                <ng-template #mymodal let-modal>
                  <div class="modal-header">
                    <h4 class="modal-title" id="modal-basic-title">
                      Sei sicuro?
                    </h4>
                    <button
                      type="button"
                      class="close"
                      aria-label="Close"
                      (click)="modal.dismiss('Cross click')"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    Procedendo eliminerai il cliente
                    <strong>{{ cliente.ragioneSociale }}</strong> e tutte le sue
                    fatture: sei sicuro?
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      (click)="modal.close('Save click')"
                    >
                      Indietro
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger shake-little"
                      (click)="eliminaCliente(cliente.id, i); modal.close()"
                    >
                      Si, sono sicuro
                    </button>
                  </div>
                </ng-template>
              </td>
            </tr>
          </tbody>
        </table>

        <nav aria-label="Page navigation" class="col-md-6">
          <ul class="pagination">
            <li class="page-item" *ngIf="!response.first">
              <a
                class="page-link myViola"
                (click)="cambiaPag(response.number - 1)"
                ><i class="bi bi-caret-left"></i
              ></a>
            </li>
            <li class="page-item" *ngFor="let pag of numP; let p = index">
              <a class="page-link myViola" (click)="cambiaPag(p)">{{
                p + 1
              }}</a>
            </li>
            <li class="page-item" *ngIf="!response.last">
              <a
                class="page-link myViola"
                (click)="cambiaPag(response.number + 1)"
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
  styles: [``],
})
export class ClientsPage implements OnInit {
  closeResult = '';
  clienti!: Cliente[];
  clientiFiltrati!: Cliente[];
  ricerca = '';
  numP: any;
  response: any;
  idCliente!: number;
  pagCorr: number = 0;

  constructor(
    private clientSrv: ClientService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.clientSrv.getAll(0).subscribe((c) => {
      this.response = c;
      this.clienti = this.clientiFiltrati = this.response.content;
      const numP = Array(this.response.totalPages);
      this.numP = numP;
    });
  }

  getClientiFiltrati(): Cliente[] {
    if (!this.ricerca) {
      return this.clienti;
    }
    const filteredArray = this.clienti.filter((c) =>
      c.ragioneSociale.includes(this.ricerca)
    );
    return filteredArray;
  }

  onSearch() {
    this.clientiFiltrati = this.clienti.filter((c) => {
      c.ragioneSociale.includes(this.ricerca);
    });
  }

  cambiaPag(page: number) {
    this.clientSrv.getAll(page).subscribe((c) => {
      this.response = c;
      this.clienti = this.response.content;
      this.pagCorr = page;
    });
  }

  async eliminaCliente(idCliente: number, i: number) {
    debugger;
    this.idCliente = idCliente;
    let id = this.pagCorr * 20 + this.idCliente;
    await this.clientSrv.deleteFatture(idCliente).toPromise();
    this.clientSrv.delete(idCliente).subscribe((c) => {
      this.router.navigate(['/clienti']);
      this.clienti.splice(i, 1);
    });
  }

  apri(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
