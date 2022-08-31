import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { UserInterceptors } from './auth/auth.interceptors';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UserInterceptors, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
