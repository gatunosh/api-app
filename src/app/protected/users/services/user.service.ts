import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { GetUser } from '../interfaces/getUsers.interface';

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

}
