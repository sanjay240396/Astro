import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthUserModel } from '../AuthUser.mode';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<AuthUserModel>(null);
  private timout: any;
  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCXaPrMwzT9Y2mUtOKE5qNFsJ6rMa5a17U',
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'An error Occured';
          if (!error.error || !error.error.error)
            return throwError(errorMessage);
          switch (error.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email exist already';
              break;
          }
          return throwError(errorMessage);
        }),
        tap((res) => {
          this.handleAuthentication(
            res.email,
            res.idToken,
            res.localId,
            res.expiresIn
          );
        })
      );
  }

  loginUser(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCXaPrMwzT9Y2mUtOKE5qNFsJ6rMa5a17U',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errRes: HttpErrorResponse) => {
          let errorMessage: string = 'An Error Occured';
          if (!errRes.error.error || !errRes.error) {
            return throwError(errorMessage);
          }
          switch (errRes.error.error.message) {
            case 'EMAIL_NOT_FOUND':
              errorMessage = 'This email not exist';
              break;
            case 'INVALID_PASSWORD':
              errorMessage = 'Password does not match';
              break;
            case 'USER_DISABLED':
              errorMessage = 'Account Locked for some reason';
              break;
          }
          return throwError(errorMessage);
        }),
        tap((res) => {
          this.handleAuthentication(
            res.email,
            res.idToken,
            res.localId,
            res.expiresIn
          );
        })
      );
  }

  private handleAuthentication(
    email: string,
    idToken: string,
    localId: string,
    expiresIn: string
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const authUser = new AuthUserModel(email, idToken, localId, expirationDate);
    this.user.next(authUser);
    this.autoLogout(+expiresIn * 1000);
    localStorage.setItem('user', JSON.stringify(authUser));
  }

  logoutUser() {
    this.user.next(null);
    localStorage.removeItem('user');
    if (this.timout) {
      clearTimeout(this.timout);
    }
    this.timout = null;
  }

  autoLogout(expDuration: number) {
    this.timout = setTimeout(() => {
      this.logoutUser();
    }, expDuration);
  }

  autoLogin() {
    const user: {
      email: string;
      idToken: string;
      localId: string;
      expirationDate: string;
    } = JSON.parse(localStorage.getItem('user'));

    if (!user) return;
    const authuser = new AuthUserModel(
      user.email,
      user.idToken,
      user.localId,
      new Date(user.expirationDate)
    );

    if (authuser.token) {
      this.user.next(authuser);
      this.autoLogout(
        new Date(user.expirationDate).getTime() - new Date().getTime()
      );
    }
  }
}
