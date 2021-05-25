import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppNavComponent } from './app-nav/app-nav.component';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { AppRouting } from 'src/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './Shared/loading-spinner/loading-spinner.component';
import { AuthenticationComponent } from './authentication/authentication.component';

@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    HomeComponent,
    ServicesComponent,
    ErrorComponent,
    LoadingSpinnerComponent,
    AuthenticationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouting,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
