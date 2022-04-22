import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let authReq: HttpRequest<any> = req.clone({
      headers: req.headers.set(
          'Authorization',
          'Bearer ' +
            'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY0OTg1OTA2NywiZXhwIjoxNjUyMDA2NTUxfQ.NHq0u9QOpiDzPLicuTIRaFKK-Fupuu5sSBvaP-u6b6HKnkvOm-iERow-eYWDvVbcWFyFGHRh6TV5KLXyog_kJQ'
        )
        .set('X-TENANT-ID', 'fe_0721b'),
    });
    return next.handle(authReq);
  }
}
