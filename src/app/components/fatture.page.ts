import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FatturaService } from '../services/fattura.service';

@Component({
  template: `
    <div class="myLista">
      <div class="container">
        <div class="titolo text-center">lista fatture</div>
        <table class="table tabella shadow">
          <thead class="myTitoletto">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Data</th>
              <th scope="col">Numero</th>
              <th scope="col">Anno</th>
              <th scope="col">Importo</th>
              <th scope="col">Stato</th>
              <th scope="col">Cliente</th>
            </tr>
          </thead>
          <tbody *ngFor="let fattura of fatture; let i = index">
            <tr>
              <th scope="row">{{ fattura.id }}</th>
              <td>{{ fattura.data | date }}</td>
              <td>{{ fattura.numero }}</td>
              <td>{{ fattura.anno }}</td>
              <td>{{ fattura.importo }}€</td>
              <td><b>{{ fattura.stato.nome }}</b></td>
              <td>{{ fattura.cliente.ragioneSociale }}</td>
              <td>
                <a
                  class="btn btnAzzurro"
                  [routerLink]="['/dettagliFattura/', fattura.id]"
                  routerLinkActive="active"
                  title="Modifica Fattura"
                  ><i class="bi bi-pencil-square"></i
                ></a>
              </td>
              <td>
                <button
                  class="btn btnRosso shake-little"
                  (click)="open(mymodal)"
                  title="Elimina Fattura"
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
                    Procedendo eliminerai la fattura
                    <strong>{{ fattura.id }}</strong> di
                    <em>{{ fattura.cliente.ragioneSociale }}</em
                    >. Sei sicuro di voler procedere?
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
                      (click)="elimina(fattura.id, i); modal.close()"
                    >
                      Si, sono sicuro
                    </button>
                  </div>
                </ng-template>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <nav aria-label="Page navigation">
          <ul class="pagination">
            <li class="page-item" *ngIf="!response.first">
              <a class="page-link" (click)="cambiaPag(response.first)">First</a>
            </li>
            <li class="page-item" *ngIf="!response.first">
              <a class="page-link" (click)="cambiaPag(response.number - 1)"
                ><i class="bi bi-caret-left"></i
              ></a>
            </li>
            <li class="page-item" *ngIf="!response.last">
              <a class="page-link" (click)="cambiaPag(response.number + 1)"
                ><i class="bi bi-caret-right"></i>
              </a>
            </li>
            <li class="page-item" *ngIf="!response.last">
              <a class="page-link" (click)="cambiaPag(response.totalPages)"
                >Last</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  `,
  styles: [],
})
export class FatturePage implements OnInit {
  constructor(
    private fatturaSrv: FatturaService,
    private modalService: NgbModal
  ) {}
  closeResult = '';
  fatture: any;
  ricerca = "";
  response: any;
  pagCorr: number = 0;
  numP: any;

  ngOnInit(): void {
    this.fatturaSrv.getAll(0).subscribe((c) => {
      this.response = c;
      this.fatture = this.response.content;
      const numP = Array(this.response.totalPages);
      this.numP = numP;
    });
  }


  cambiaPag(page: number) {
    this.fatturaSrv.getAll(page).subscribe((c) => {
      this.response = c;
      this.fatture = this.response.content;
      this.pagCorr = page;
    });
  }

  elimina(id: number, i: number) {
    this.fatturaSrv.delete(id).subscribe(() => {
      this.fatture.splice(i, 1);
    });
  }

  open(content: any) {
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
