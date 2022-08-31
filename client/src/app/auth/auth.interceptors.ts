import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, take } from 'rxjs';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class UserInterceptors implements HttpInterceptor {
  constructor(private authService: UserService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.getUser().pipe(
      take(1),
      switchMap((user) => {
        const reqClone = req.clone({
          headers: new HttpHeaders().set(
            'Authorization',
            user?.token ? `Bearer ${user.token}` : ''
          ),
        });
        return next.handle(reqClone);
      })
    );
  }
}
