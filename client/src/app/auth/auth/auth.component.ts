import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  isLogin = true;

  loading = false;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  switchModeHandler() {
    this.isLogin = !this.isLogin;
  }

  submitUser() {
    const { email, password } = this.authForm.value;
    this.loading = true;

    let obs$: Observable<any>;
    if (this.isLogin) {
      obs$ = this.userService.loginUser(email, password);
    } else {
      obs$ = this.userService.signup(email, password);
    }

    obs$.subscribe({
      next: () => {
        if (this.isLogin) this.router.navigate(['/'], { replaceUrl: true });
        this.authForm.reset();
        this.loading = false;
      },
    });
  }
}
