import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from '../../services/user.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {


  displayedColumns: string[] = [
    'id',
    'first_name',
    'last_name',
    'email',
  ];
  dataSource!: MatTableDataSource<User>;

  constructor(private userService: UserService) { 
    this.userService.getUsers().subscribe({
      next: resp => {
        this.dataSource = new MatTableDataSource(resp.users);
      }
    })
  }

  ngOnInit(): void {
    
  }

}
