import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { RegisterService } from './services/register.service';
import { LdButtonComponent } from "../../shared/components/ld-button/ld-button.component";
import { LdWrapperComponent } from '@app/shared/components/ld-wrapper/ld-wrapper.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { message } from '@app/shared/utils/message';
import { Router } from '@angular/router';
import { IUser } from './interfaces/IUser';
import { LdBgCubesComponent } from "../../shared/components/ld-bg-cubes/ld-bg-cubes.component";

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    LdButtonComponent,
    LdWrapperComponent,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    LdBgCubesComponent
],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {

  registerForm!: FormGroup;
  message = message;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      role: ['', Validators.required],
      fullName: ['', Validators.required],
      birthDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  cadastrar() {

    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    let payload: IUser = this.registerForm.value;

    this.registerService
      .postUser(payload)
      .subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Bom Trabalho!',
            text: 'Cadastrado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok!'
          }).then((result) => {
            
            if (!result.isConfirmed) {
              return;
            }

            //Apenas para fins de desenvolvimento pois não há autenticação
            localStorage.setItem('userName', response.fullName);
            localStorage.setItem('role', response.role === 'dev' ? 'Desenvolvedor' : 'Cliente');
            localStorage.setItem('idClient', response.id);

            this.router.navigate(['project/list']);
          });
        },
        error: (error) => {
          Swal.fire({
            title: 'Erro!',
            text: 'Falha ao cadastrar. Tente novamente.',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      })
  }

  toogleRole(role: 'dev' | 'cliente') {
    this.registerForm.get('role')?.setValue(role);
  }

  isInvalid(inputName: string, validatorName: string) {
    const control = this.registerForm.get(inputName);
    return !!(control?.errors?.[validatorName] && control.touched);
  }
}
