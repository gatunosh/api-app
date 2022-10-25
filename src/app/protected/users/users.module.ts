import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './pages/user-list/user-list.component';
import { MaterialModule } from '../../material/material.module';
import { UserComponent } from './pages/user/user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    UserListComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    UsersRoutingModule,
    MaterialModule
  ]
})
export class UsersModule { }
