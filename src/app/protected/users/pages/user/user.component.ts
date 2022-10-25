import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { switchMap, tap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {

  form: FormGroup = this.fb.group({
    email: ['', [ Validators.required, Validators.email ]],
    first_name: ['', [ Validators.required ]],
    last_name: ['', [ Validators.required ]],
    vat: ['', [ Validators.required,Validators.minLength(10), Validators.maxLength(10) ]],
  });

  private _id!: string;

   constructor(private fb: FormBuilder, private userService:UserService,
              private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      tap(({id}) => this._id = id),
      switchMap(({id}) => this.userService.getUser(id))
    ).subscribe({
      next: user => {
        this.form.reset({
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          vat: user.vat
        })
      }
    })
  }

  save() {

    if (this.form.invalid) return;

    this.userService.updateUser(this._id, this.form.value)
        .subscribe({
          next: resp => {
            if (resp === true) {
              this.router.navigateByUrl('/dashboard/users')
            } else {
              Swal.fire('Error', resp, 'error');
            }
          }
        })
  }

}
