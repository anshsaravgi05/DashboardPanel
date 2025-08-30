import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost/login';

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login.php`, data, { withCredentials: true });
  }

  checkSession(): Observable<any> {
    return this.http.get(`${this.baseUrl}/check_session.php`, { withCredentials: true });
  }

  logout(): Observable<any> {
    return this.http.get(`${this.baseUrl}/logout.php`, { withCredentials: true });
  }
}

