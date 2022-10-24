import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  get user() {
    return this.authService.user;
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
