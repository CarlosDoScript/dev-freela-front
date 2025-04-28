import { Component, OnInit } from '@angular/core';
import { LdWrapperComponent } from "../../../../shared/components/ld-wrapper/ld-wrapper.component";
import { LdBgCubesComponent } from "../../../../shared/components/ld-bg-cubes/ld-bg-cubes.component";
import { LdButtonComponent } from "../../../../shared/components/ld-button/ld-button.component";
import { ICreateEditProject } from '../../interfaces/ICreateEditProject';
import { CreateEditStatus } from '../../enums/CreateEditStatus';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { IProject } from '../../interfaces/IProject';
import { message } from '@app/shared/utils/message';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective} from 'ngx-mask';
import { AuthService } from '@app/core/services';
import { IProjectParams } from '../../interfaces/IProjectParams';
import { Helpers } from '@app/shared/utils/helper';

@Component({
  standalone: true,
  selector: 'app-project-create-edit',
  imports: [
    LdWrapperComponent,
    LdBgCubesComponent,
    LdButtonComponent,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  templateUrl: './project-create-edit.component.html',
  styleUrl: './project-create-edit.component.scss'
})

export class ProjectCreateEditComponent implements OnInit {

  createEditProjectForm!: FormGroup
  createEditProject: ICreateEditProject = {
    title: '',
    totalCost: 0,
    description: '',
    idClient: ''
  };

  params: IProjectParams = {};

  // Type: 'create' | 'edit'
  screenType: CreateEditStatus = CreateEditStatus.create;
  messageTitleType: string = '';
  messageButtonType: string = '';
  message = message;
  helpers = Helpers;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.createEditProjectForm = this.fb.group({
      title: ['', Validators.required],
      totalCost: [null, Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getParams();
  }

  createOrEdit() {

    if (!this.createEditProjectForm.valid) {
      this.createEditProjectForm.markAllAsTouched();
      return;
    }

    let payload: ICreateEditProject  = this.createEditProjectForm.value;
    payload.idClient = this.authService.getUser().clientId ?? '';

    this.projectService
      .CreateEditProject(this.screenType, this.params, payload)
      .subscribe({
        next: (response) => {

          let messageSuccess = this.screenType === CreateEditStatus.edit ? 'Editado com sucesso!' : 'Cadastrado com sucesso!'

          Swal.fire({
            title: 'Bom Trabalho!',
            text: messageSuccess,
            icon: 'success',
            confirmButtonText: 'Ok!'
          }).then((result) => {

            if (!result.isConfirmed) {
              return;
            }

            this.router.navigate(['project/list']);
          });

        },
        error: (error) => {

          let messageError = this.screenType === CreateEditStatus.edit ? 'alterar' : 'cadastrar'

          Swal.fire({
            title: 'Erro!',
            text: `Falha ao ${messageError}. Tente novamente.`,
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      });
  }

  fillInputs() {
    if (this.screenType === CreateEditStatus.edit) {
      this.projectService
        .GetByIdProject(this.params)
        .subscribe({
          next: (response: IProject) => {
            this.createEditProjectForm.patchValue({
              title: response.title,
              totalCost: response.totalCost,
              description: response.description
            })
          },
          error: (error: any) => {
            Swal.fire({
              title: 'Erro!',
              text: 'Falha ao buscar projeto. Tente novamente.',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          }
        })
    }

  }

  getParams() {
    this.activateRoute.queryParams.subscribe((params) => {
      this.params = params as IProjectParams;
      this.screenType = this.params.id ? CreateEditStatus.edit : CreateEditStatus.create;
      this.setScreenTypeTexts();
      this.fillInputs();
    });
  }

  setScreenTypeTexts() {
    const texts = this.screenTexts[this.screenType];
    if (texts) {
      this.messageTitleType = texts.title;
      this.messageButtonType = texts.button;
    }
  }

  readonly screenTexts = {
    [CreateEditStatus.create]: {
      title: 'Vamos cadastrar seu novo projeto!',
      button: 'Cadastrar'
    },
    [CreateEditStatus.edit]: {
      title: 'Editar projeto',
      button: 'Salvar'
    }
  };
}
