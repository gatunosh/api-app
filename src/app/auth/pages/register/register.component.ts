import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

  form: FormGroup = this.fb.group({
    email: ['adrian@test.com', [ Validators.required, Validators.email ]],
    password: ['123456', [ Validators.required, Validators.minLength(6) ]],
    first_name: ['Jackson', [ Validators.required ]],
    last_name: ['Lima', [ Validators.required ]],
    vat: ['1721535993', [ Validators.required,Validators.minLength(10), Validators.maxLength(10) ]],
  });

  constructor(private fb: FormBuilder, private authService:AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  register() {

    const { email, password, first_name, last_name, vat } = this.form.value;

    this.authService.register({email, password, first_name, last_name, vat}).subscribe({
      next: resp => {
        if (resp === true) {
          this.router.navigateByUrl('/dashboard')
        }
        else {
          Swal.fire('Error', resp, 'error');
        }
      }
    })

  }

}
