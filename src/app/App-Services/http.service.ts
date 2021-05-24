import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../user.model';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private http: HttpClient) {}
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
        })
      );
  }
}
