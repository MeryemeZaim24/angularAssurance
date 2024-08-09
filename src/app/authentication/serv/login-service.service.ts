import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private apiUrl = 'http://localhost:8080/user/login';

  constructor(private http: HttpClient) {}

  login(user: { userId: string, password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
}
