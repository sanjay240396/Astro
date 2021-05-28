import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppNavComponent } from './app-nav/app-nav.component';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingSpinnerComponent } from './Shared/loading-spinner/loading-spinner.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { FetchUserComponent } from './fetch-user/fetch-user.component';
import { AppRouting } from './app-routing.module';
import { AuthInterceptor } from './App-Services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    HomeComponent,
    ServicesComponent,
    ErrorComponent,
    LoadingSpinnerComponent,
    AuthenticationComponent,
    FetchUserComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouting,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
