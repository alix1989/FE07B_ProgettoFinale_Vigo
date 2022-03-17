import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authSubject = new BehaviorSubject<null | User>(null);
  user$ = this.authSubject.asObservable();

  constructor(private http: HttpClient) {}

  signup(item:any) {
    console.log(item);
    return this.http.post(`${environment.pathApi}/api/auth/signup`, item);
  }

  login(item: any) {
    return this.http.post<any>(`${environment.pathApi}/api/auth/login`, item);
  }

  getAll(p: any) {
    return this.http.get<any>(`${environment.pathApi}/api/users?page=${p}&size=20&sort=id,ASC`);
  }
}
