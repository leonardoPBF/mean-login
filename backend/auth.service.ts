import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

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

  login(credentials: any): Observable<any> {
    const apiUrl = 'http://localhost:5000/api/auth/login'; // Asegúrate de que esta URL sea correcta

    return this.http.post(apiUrl, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          this.loggedIn.next(true);
          this.currentUser.next(response.user);
        } else {
          this.loggedIn.next(false);
          this.currentUser.next(null);
          console.error('Error de autenticación: Respuesta inesperada del servidor');
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud de login:', error);
        return throwError(() => new Error('Error de autenticación'));
      })
    );
  }

  logout(): Observable<any>{
    const apiUrl = 'http://localhost:5000/api/auth/logout'; // Asegúrate de que esta URL sea correcta
    return this.http.post(apiUrl, {}, { responseType: 'text' }).pipe(
      tap((response: any) => {
        console.log(response);
        this.loggedIn.next(false);
        this.currentUser.next(null);
        localStorage.removeItem('authToken'); // Elimina el token del almacenamiento local
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud de logout:', error);
        return throwError(() => new Error('Error al cerrar sesión'));
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
