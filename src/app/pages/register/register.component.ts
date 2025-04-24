import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { RegisterService } from '../../services/register.service';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
  ) {
    this.form = this.fb.group({
      role: ['', Validators.required],
      fullName: ['', Validators.required],
      birthDate: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  cadastrar() {
    if (!this.form.value.role) {
      Swal.fire('Algo de errado...', 'Marque alguma role!', 'error')
      return;
    }

    if (this.form.invalid) {
      Swal.fire('Campos obrigatórios', 'Preencha todos os campos corretamente!', 'error')
      return;
    }

    const payload = this.form.value;

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
}
