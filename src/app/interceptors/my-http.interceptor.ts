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
            'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY0NjgzNTA0NywiZXhwIjoxNjQ3Njk5MDQ3fQ.qqUco9uJjm4_AVrCvGMfFBVwnAN0ubdgQv6rXn-LschHrq_wyPHnOFCsybZu-c6katwXEa_4bfTHKhgUgzS6xQ'
        )
        .set('X-TENANT-ID', 'fe_0721b'),
    });
    return next.handle(authReq);
  }
}
