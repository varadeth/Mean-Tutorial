import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  constructor(private http: HttpClient) { }

  createUser(name: string, dob: Date, email: string, password: string) {
    const user: User = {name: name, dob: dob, email: email, password: password};
    this.http.post('http://localhost:3000/api/user/signup', user)
      .subscribe(response => {
        console.log(response);
      });
  }

  loginUser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post<{token: string}>('http://localhost:3000/api/user/login', authData)
      .subscribe(response => {
        this.token = response.token;
      });
  }

  getToken() {
    return this.token;
  }
}
