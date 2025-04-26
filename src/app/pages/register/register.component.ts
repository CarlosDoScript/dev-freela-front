import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { RegisterService } from '@app/services';
import { LdButtonComponent } from "../../shared/components/ld-button/ld-button.component";
import { LdWrapperComponent } from '@app/features/ld-wrapper/ld-wrapper.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { message } from '@app/shared/utils/message';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    LdButtonComponent,
    LdWrapperComponent,
    MatFormFieldModule,
    MatInputModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  message = message;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
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

    const payload = this.registerForm.value;

    this.registerService.cadastrar(payload).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Bom Trabalho!',
          text: 'Cadastrado com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok!'
        }).then((result) => {
          if (result.isConfirmed) {

            //Apenas para fins de desenvolvimento pois não há autenticação
            localStorage.setItem('userName', response.fullName);
            localStorage.setItem('role', response.role === 'dev' ? 'Desenvolvedor' : 'Cliente');
            localStorage.setItem('idClient', response.id);

            window.location.href = 'list.html';
          }
        });
      }
    })
  }

  toogleRole(role: 'dev' | 'cliente') {
    this.registerForm.get('role')?.setValue(role);
  }

  isInvalid(inputName: string, validatorName: string) {
    return this.registerForm.get(inputName)?.errors?.[validatorName] &&
      this.registerForm.get(inputName)?.touched;
  }

}
