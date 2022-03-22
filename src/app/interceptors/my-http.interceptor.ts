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
            'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY0Nzk2NzIxOSwiZXhwIjoxNjQ4ODMxMjE5fQ.QxlIQapVl1gaOu8mILWU7zFcwowNuVMh9CmdUHoJOl386Ex_CwCGCx0T05t1L5nXuiqLE0P2VPB8nc2ZX54o7A'
        )
        .set('X-TENANT-ID', 'fe_0721b'),
    });
    return next.handle(authReq);
  }
}
