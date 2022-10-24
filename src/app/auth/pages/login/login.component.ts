import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router) { }

  form: FormGroup = this.fb.group({
    email: ['adrian@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  login() {

    const {email, password} = this.form.value;

    this.auth.login(email, password).subscribe({
      next: resp => {
        if (resp === true) {
          this.router.navigateByUrl('/dashboard')
        } else {
          Swal.fire('Error', resp, 'error');
        }
      }
    })

  }

}
