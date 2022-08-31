import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { AuthRoutingModule } from './auth.routes';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule],
})
export class AuthModule {}
