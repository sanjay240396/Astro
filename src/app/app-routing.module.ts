import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGruard } from './App-Services/auth-guard.service';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ErrorComponent } from './error/error.component';
import { FetchUserComponent } from './fetch-user/fetch-user.component';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'authenticate', component: AuthenticationComponent },
  {
    path: 'fetchUser',
    canActivate: [authGruard],
    component: FetchUserComponent,
  },
  { path: 'not-found', component: ErrorComponent },
  { path: '**', redirectTo: '/not-found' },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRouting {}
