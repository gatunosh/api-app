import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { GetUser, ModifyUser } from '../interfaces/getUsers.interface';

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
                console.log('ERROR');
                console.log(err);
                return of(err.error)
              })
            );
  
  }

}
