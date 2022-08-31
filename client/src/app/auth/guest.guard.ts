import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanLoad {
  constructor(private userService: UserService, private router: Router) {}
  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    return this.userService.getUser().pipe(
      take(1),
      map((user) => {
        if (this.userService.isAuth()) {
          this.router.navigateByUrl('/', {replaceUrl: true});
          return false;
        } else {
          return true;
        }
      })
    );
  }
}