import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from '../../services/user.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {


  displayedColumns: string[] = [
    'id',
    'first_name',
    'last_name',
    'email',
    'actions'
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

  updateUser(id:string) {
    console.log(id);
  }

  deleteUser(id:string) {
    this.userService.deleteUser(id)
        .subscribe({
          next: resp => {
            if (resp === true) {
              this.dataSource.data = this.dataSource.data.filter((user) => user.id !== Number(id));
            } else {
              Swal.fire('Error', resp, 'error');
            }
          }
        })
  }

}
