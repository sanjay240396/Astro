import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../App-Services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  signUpForm: FormGroup;
  isSignUp: boolean = true;
  isLoading: boolean = false;
  errorMessage: String = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup(
      {
        title: new FormControl('mr', Validators.required),
        username: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          this.validatePassword,
        ]),
        confirmPassword: new FormControl(null, [
          Validators.required,
          this.validateConfirmPassword.bind(this),
        ]),
      },
      this.validateConfirmPassword
    );
  }

  getColor() {
    return this.isSignUp == true ? '#ff5454' : '#02203c';
  }

  validatePassword(control: FormControl) {
    if (control.value) {
      if ((<string>control.value).length < 8) {
        return { invalidPassword: true };
      }
    }
    return null;
  }

  validateConfirmPassword(group: FormGroup) {
    if (group.get('password') && group.get('confirmPassword')) {
      if (group.get('password').value != group.get('confirmPassword').value) {
        return { passwordNotMatch: true };
      }
    }
    return null;
  }

  onSwitch() {
    this.isSignUp = !this.isSignUp;
    this.errorMessage = null;
    this.signUpForm.reset();
    this.signUpForm.patchValue({ title: 'mr' });
  }

  onSubmit() {
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    let authObservable: Observable<AuthResponseData>;
    this.isLoading = true;
    //sign Up
    if (this.isSignUp) {
      authObservable = this.authService.signUp(email, password);
    }
    // Login
    else {
      authObservable = this.authService.loginUser(email, password);
    }
    authObservable.subscribe(
      (res) => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    );
    this.signUpForm.reset();
  }
}
