import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CustomInputConfig } from '../Components/custom-input/custom-input.config';
import { CustomInputComponent } from '../Components/custom-input/custom-input.component';
import { LoginForm } from './loginForm';
import { SubmitButtonComponent } from '../Components/submit-button/submit-button.component';
import { LoginDto, loginSchema } from './login.dto';
import { LoginService } from './login.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    CustomInputComponent,
    SubmitButtonComponent,
    HttpClientModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export default class LoginComponent {
  loginForm: FormGroup<LoginForm>;

  emailConfig: CustomInputConfig = {
    label: 'Correo Electrónico',
    type: 'email',
    errorMessages: {
      required: 'El correo es obligatorio',
      email: 'Correo inválido',
    },
  };

  get emailControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  passwordConfig: CustomInputConfig = {
    label: 'Contraseña',
    type: 'password',
    errorMessages: { required: 'La contraseña es obligatoria' },
  };

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  constructor(private fb: FormBuilder, private loginService: LoginService) {
    this.loginForm = this.fb.group<LoginForm>({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', Validators.required),
    });
  }

  onLogin() {
    try {
      loginSchema.parse(this.loginForm.value);
      const { email, password } = this.loginForm.value;
      const Logiin: LoginDto = {
        email: email ?? '',
        password: password ?? '',
      };

      this.loginService.login(Logiin).subscribe({
        next: (response) => {
          console.log('Login successful', response);
        },
        error: (error) => {
          console.log('Login failed', error);
        },
      });
    } catch (error) {}
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      console.log(email);
      console.log(password);
    }
  }
}
