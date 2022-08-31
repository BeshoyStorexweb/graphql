// import { Injectable } from '@angular/core';
// import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
// import { map, Observable, take } from 'rxjs';
// import { UserService } from './user.service';

// @Injectable({providedIn: 'root'})
// export class AuthGuard implements CanLoad {
//   constructor(private userService: UserService, private router: Router) {}
//   canLoad(
//     route: Route,
//     segments: UrlSegment[]
//   ): boolean | Observable<boolean> | Promise<boolean> {
//     return this.userService.getUser().pipe(
//       take(1),
//       map((user) => {
//         const isAuth = !!user;
//         console.log('ISAUTH', isAuth);
        
//         if (isAuth) return true;
//         else {
//           this.router.navigateByUrl('/auth');
//           return false;
//         }
//       })
//     );
//   }
// }


import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanLoad {
  constructor(private userService: UserService, private router: Router) {}
  canLoad(_: Route, __: UrlSegment[]): boolean | Observable<boolean> {
    return this.userService.getUser().pipe(
      take(1),
      map((user) => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        } else {
          this.router.navigateByUrl('/auth');
          return false;
        }
      })
    );
  }
}