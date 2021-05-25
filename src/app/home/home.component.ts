import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../App-Services/http.service';
import { User } from '../user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private httpService: HttpService) {}
  user: User;
  users: User[] = [];
  questionForm: FormGroup;
  isFetching = false;

  ngOnInit(): void {
    this.questionForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNo: new FormControl(null, [
        Validators.required,
        this.validatePhoneNo,
      ]),
      questions: new FormArray([]),
    });
    // this.onFetch();
  }

  getQuestions() {
    return (<FormArray>this.questionForm.get('questions')).controls;
  }

  onAddQuestion() {
    const control = new FormControl(null);
    (<FormArray>this.questionForm.get('questions')).push(control);
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

  onFetch() {
    this.isFetching = true;
    this.httpService.getUser().subscribe((response) => {
      this.users = response;
      this.isFetching = false;
    });
  }
}
