import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  getAll(p: number) {
    return this.http.get(
      `${environment.pathApi}/api/clienti?page=${p}&size=20&sort=id,ASC`
    );
  }

  getById(id: number) {
    return this.http.get(`${environment.pathApi}/api/clienti/${id}`);
  }

  deleteFatture(id: number) {
    return this.http.delete(`${environment.pathApi}/api/fatture/cliente/${id}`);
  }

  delete(id: number) {
    return this.http.delete(`${environment.pathApi}/api/clienti/${id}`);
  }

  getFattureByCliente(id: number, p: number) {
    return this.http.get(
      `${environment.pathApi}/api/fatture/cliente/${id}?page=${p}&size=20&sort=id,ASC`
    );
  }

  createCliente(cliente: Cliente) {
    return this.http.post(`${environment.pathApi}/api/clienti`, cliente);
  }

  edit(data: any){
    return this.http.put(`${environment.pathApi}/api/clienti/${data.id}`, data);
  }
}
