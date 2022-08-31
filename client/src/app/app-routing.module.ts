import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { GuestGuard } from './auth/guest.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/events'
  },
  {
    path: 'events',
    pathMatch: 'full',
    loadChildren: () =>
      import('./events/events.module').then((m) => m.EventModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canLoad: [GuestGuard],
  },
  {
    path: 'bookings',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./bookings/bookings.module').then((m) => m.BookingsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
