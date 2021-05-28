import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, exhaustMap, map, take } from 'rxjs/operators';
import { User } from '../user.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class HttpService implements OnInit {
  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {}

  postRequest(user: User) {
    return this.http
      .post<{ name: string }>(
        'https://astro-e3e1e-default-rtdb.firebaseio.com/posts.json',
        {
          name: user.name,
          email: user.email,
          phoneNo: user.phoneNo,
          questions: user.questions,
        }
      )
      .pipe(
        catchError((error) => {
          throw new Error('An Error Occured' + error);
        })
      );
  }

  getUser() {
    return this.http
      .get<{ [key: string]: User }>(
        'https://astro-e3e1e-default-rtdb.firebaseio.com/posts.json'
      )
      .pipe(
        map((res) => {
          const postsArray: User[] = [];
          for (let key in res) {
            if (res.hasOwnProperty(key))
              postsArray.push({ ...res[key], id: key });
          }
          return postsArray;
        }),
        catchError((err) => {
          throw new Error(err.message);
        })
      );
  }
}
