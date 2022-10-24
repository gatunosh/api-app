import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, tap, catchError, of, Observable } from 'rxjs';
import { AuthResponse, User } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _user!: User;

  get user(): User {
    return {...this._user};
  }

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {

    const url   = `${this.baseUrl}/auth`;
    const body  = { email, password}

    return this.http.post<AuthResponse | HttpErrorResponse>(url, body).pipe(
      tap( resp => {
        if (!(resp instanceof HttpErrorResponse)) {
          localStorage.setItem('token', resp.token!);
          this._user = {
            first_name: resp.first_name!,
            last_name: resp.last_name!,
            id: resp.id!  
          }
        }
      }),
      map(valid => {
        // No importa quer venga quiero que la respuesta final del observable
        // sea true cuando todo es correcto
        return true;
      }),
      catchError(err => {
        // Si hay un error con este metodo agarramos el error y retornamos 
        // que el observable sea false
        return of(err.error.msg)
      })
    )

  }

  register(user:User) {

    const url   = `${this.baseUrl}/user`;
    const body  = { ...user }

    return this.http.post<AuthResponse | HttpErrorResponse>(url, body).pipe(
      tap( resp => {
        if (!(resp instanceof HttpErrorResponse)) {
          localStorage.setItem('token', resp.token!);
          this._user = {
            first_name: resp.first_name!,
            last_name: resp.last_name!,
            id: resp.id!  
          }
        }
      }),
      map(resp => {
        if (!(resp instanceof HttpErrorResponse) && resp.token) {
          return true;
        }
        return false;
      }),
      catchError(err => {
        return of(err.error)
      })
    )
  }

  validateToken(): Observable<boolean> {
    const url   = `${this.baseUrl}/auth/renew`;

    const headers = new HttpHeaders()
          .set('x-token', localStorage.getItem('token') || '')

    return this.http.get<AuthResponse>(url, {headers})
            .pipe(
              map(resp => {
                if (resp.token) {
                  localStorage.setItem('token', resp.token!);
                  this._user = {
                    first_name: resp.first_name!,
                    last_name: resp.last_name!,
                    id: resp.id!  
                  }
                  return true;
                }
                return false;
              }),
              catchError(err => {
                return of(false)
              })
            )
  }

  logout(){
    localStorage.removeItem('token');
  }

}
