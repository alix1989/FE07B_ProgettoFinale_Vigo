import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from '../models/client';
import { FatturaService } from '../services/fattura.service';

@Component({
  template: `
    <div class="container p-5">
      <div class="titolo text-center">modifica fattura</div>
      <div class="cardFattura">
        <form #form="ngForm" (ngSubmit)="salva(form)">
          <h5 class="card-title nome">{{ cliente.ragioneSociale }}</h5>
          <h5 class="card-subtitle mb-2 text-muted sottotitolo">
            {{ cliente.nomeContatto }} {{ cliente.cognomeContatto }}
          </h5>
          <table>
            <tbody>
              <tr>
                <td><strong>Importo:</strong></td>
                <td>{{ fattura.importo }}€</td>
              </tr>
              <tr>
                <td><strong>Stato Fattura:</strong></td>
                <td>
                  <select name="stato" id="stato" ngModel>
                    <!-- <option value="{{ fattura.stato.nome }}" selected></option> -->
                    <option value=""></option>
                    <option value="2">PAGATA</option>
                    <option value="1">NON PAGATA</option>
                  </select>
                </td>
              </tr>

              <tr>
                <td><strong>ID unico:</strong></td>
                <td>{{ fattura.id }}</td>
              </tr>

              <tr>
                <td><strong>Data:</strong></td>
                <td>{{ fattura.data | date }}</td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex mt-5 justify-content-evenly">
            <button type="submit" class="btn-success btn" title="Modifica fattura">
              <i class="bi bi-check"></i>
            </button>
            <button
              class="btn btn-danger shake-little"
              (click)="open(mymodal)"
              title="Elimina Fattura"
            >
              <i class="bi bi-trash"></i>
            </button>

            <button type="submit" title="Torna alle fatture" class="btn-primary btn" (click)="indietro()">
            <i class="bi bi-arrow-90deg-left"></i>
            </button>


            <!-- MODALE -->

            <ng-template #mymodal let-modal>
              <div class="modal-header">
                <h4 class="modal-title" id="modal-basic-title">Sei sicuro?</h4>
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
                  (click)="elimina(fattura.id); modal.close()"
                >
                  Si, sono sicuro
                </button>
              </div>
            </ng-template>
          </div>

        </form>
      </div>
    </div>
  `,
  styles: [
    `
      .titolo {
        margin-top: 10%;
      }

      .sottotitolo {
        font-family: 'Comfortaa', cursive;
      }

      .cardFattura {
        margin: auto;
        padding: 2%;
        width: 40%;
        background: #e9e9e9;
        position: relative;
        border: 2px solid #a2d9ff;
        border-radius: 3%;
      }

      .nome {
        color: #a2d9ff;
        font-family: 'Comfortaa', cursive;
        text-shadow: 1px 1px 1px #444;
      }

      td,
      tr {
        width: 100%;
        padding: 0.5rem;
      }
    `,
  ],
})
export class FatturaDetailsPage implements OnInit {
  fattura: any;
  response: any;
  cliente!: Cliente;
  closeResult = '';

  constructor(
    private fatturaSrv: FatturaService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.caricaDettagli(id);
    });
  }

  caricaDettagli(id: number) {
    this.fatturaSrv.details(id).subscribe((res) => {
      this.fattura = res;
      this.cliente = this.fattura.cliente;
    });
  }

  salva(form: NgForm) {
    console.log(form.value.stato);
    this.fattura.stato.id = form.value.stato;
    console.log(this.fattura);
    this.fatturaSrv.edit(this.fattura).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/fatture']);
    });
  }

  elimina(id: number) {
    this.fatturaSrv.delete(id).subscribe(() => {
      this.router.navigate(['/fatture']);
    });
  }

  indietro() {
      this.router.navigate(['/fatture']);
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
