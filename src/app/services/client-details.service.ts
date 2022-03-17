import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientDetailsService {

    constructor(private http: HttpClient) { }

    getTipiCliente() {
      return this.http.get(`${environment.pathApi}/api/clienti/tipicliente`);
    }

    creaNuovoCliente(data: any) {
      return this.http.post(`${environment.pathApi}/api/clienti/tipicliente`, data);
    }
}
