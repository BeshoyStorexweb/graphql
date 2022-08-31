import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, tap } from 'rxjs';
import { CREATE_USER, LOGIN_USER } from '../graphql/graphql.queries';
import { User } from '../models/user';

interface Login {
  login: User;
}

const USER_KEY = 'user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private user$ = new BehaviorSubject<User | null>(null);
  constructor(private apollo: Apollo, private router: Router) {}

  getUser() {
    return this.user$.asObservable();
  }

  loginUser(email: string, password: string) {
    return this.apollo
      .query<Login>({ query: LOGIN_USER, variables: { email, password } })
      .pipe(
        tap((res) => {
          if (res.data) this.saveUserData(res.data.login);
        })
      );
  }

  signup(email: string, password: string) {
    return this.apollo
      .mutate({ mutation: CREATE_USER, variables: { email, password } })
      .pipe(tap(console.log));
  }

  saveUserData(user: User) {
    this.user$.next(user);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  isAuth() {
    return !!localStorage.getItem(USER_KEY);
  }

  autoLogin() {
    const userData: User = JSON.parse(localStorage.getItem(USER_KEY) as string);
    if (!userData) return;
    const loadedUser = new User(
      userData.email,
      userData.token,
      userData.tokenExp
    );
    this.user$.next(loadedUser);
    localStorage.setItem(USER_KEY, JSON.stringify(loadedUser));
  }

  logout() {
    this.user$.next(null);
    localStorage.removeItem(USER_KEY);
    this.router.navigateByUrl('/auth', { replaceUrl: true });
  }
}
