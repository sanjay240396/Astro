import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../App-Services/auth.service';
import { HttpService } from '../App-Services/http.service';
import { User } from '../user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private httpService: HttpService,
    private authService: AuthService
  ) {}
  user: User;
  questionForm: FormGroup;
  isFetching = false;

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {});

    //question Form creation
    this.questionForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNo: new FormControl(null, [
        Validators.required,
        this.validatePhoneNo,
      ]),
      questions: new FormControl(null),
    });
  }

  validatePhoneNo(control: FormControl): { [s: string]: boolean } {
    if (control.value > 9999999999) return { invalidPhoneNumber: true };
    return null;
  }

  onSubmit() {
    console.log(this.questionForm);

    this.user = {
      name: this.questionForm.value.username,
      email: this.questionForm.value.email,
      phoneNo: this.questionForm.value.phoneNo,
      questions: this.questionForm.value.questions,
    };

    this.httpService.postRequest(this.user).subscribe(
      (res) => console.log(res),
      (error) => console.log(error)
    );
    console.log(this.user);
    this.questionForm.reset();
  }
}
