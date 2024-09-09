import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';

  //variables para almacenar la sesion de usuario
  private loggedIn = new BehaviorSubject<boolean>(false);
  private currentUser = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: any) {
    return this.http.post('/login', credentials).pipe(
      tap((response: any) => {
        if (response.success) {
          this.loggedIn.next(true);
          this.currentUser.next(response.user);
        }
      })
    );
  }

  logout() {
    return this.http.post('/logout', {}).pipe(
      tap(() => {
        this.loggedIn.next(false);
        this.currentUser.next(null);
      })
    );
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  getCurrentUser() {
    return this.currentUser.asObservable();
  }
}
