import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { GetUser, ModifyUser } from '../interfaces/getUsers.interface';
import { User } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<GetUser> {

    const url = `${this.baseUrl}/users`;

    return this.http.get<GetUser>(url);

  }

  getUser(id: string) {

    const url = `${this.baseUrl}/user/${id}`;

    return this.http.get<User>(url);
  }

  deleteUser(id: string) {

    const url = `${this.baseUrl}/user/${id}`;

    return this.http.delete<ModifyUser>(url)
            .pipe(
              map(resp => {
                if (resp.user) {
                  return true;
                }
                return false;
              }),
              catchError(err => {
                return of(err.error)
              })
            );
  
  }

  updateUser(id: string, user: User) {
    const url = `${this.baseUrl}/user/${id}`;
    const body = { ...user };

    return this.http.put<ModifyUser>(url , body)
            .pipe(
              map(resp => {
                if (resp.user) {
                  return true;
                }
                return false;
              }),
              catchError(err => {
                return of(err.error)
              })
            );
  }

}
