import { Component, OnInit } from '@angular/core';
import { AuthService } from '../App-Services/auth.service';
import { HttpService } from '../App-Services/http.service';
import { User } from '../user.model';

@Component({
  selector: 'app-fetch-user',
  templateUrl: './fetch-user.component.html',
  styleUrls: ['./fetch-user.component.css'],
})
export class FetchUserComponent {
  isFetching = false;
  users: User[] = [];
  constructor(private httpService: HttpService) {}

  onFetch() {
    this.isFetching = true;
    this.httpService.getUser().subscribe(
      (response) => {
        this.users = response;
        this.isFetching = false;
      },
      (error) => console.log(error)
    );
  }
}
