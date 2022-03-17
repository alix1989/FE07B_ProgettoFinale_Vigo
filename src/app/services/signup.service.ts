import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  myApiUrl:string = environment.pathApi;
  nuovoUser = {username:'',email:'',password:'', role: [] }
  constructor(private http:HttpClient) { }

  signup(nuovoUser:any){
    return this.http.post<any>(this.myApiUrl + '/api/auth/signup',nuovoUser);
    }

  }

