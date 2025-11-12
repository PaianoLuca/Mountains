import { Component, signal } from '@angular/core';
import { FormGroup, Validators, FormControl, ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Auth } from '../../core/auth/auth';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const password_confirmation = control.get('password_confirmation')?.value;

  if (password && password_confirmation && password !== password_confirmation) {
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password_confirmation: new FormControl('', [Validators.required, Validators.minLength(8)]),
  }, { validators: passwordMatchValidator });

  constructor(private auth: Auth) {}

  submit() {
    if (this.form.valid){
      const { name, email, password, password_confirmation } = this.form.value;
      this.auth.register(name!, email!, password!);
    } else {
      alert('Please fill in all fields');
      console.log(this.form.errors);
    }
  }
}