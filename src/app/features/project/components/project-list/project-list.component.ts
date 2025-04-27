import { Component, OnInit } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { LdWrapperComponent } from "../../../../shared/components/ld-wrapper/ld-wrapper.component";
import { ProjectService } from '../../services/project.service';
import { IListProject } from '../../interfaces/IListProject';
import Swal from 'sweetalert2';
import { LdButtonComponent } from "../../../../shared/components/ld-button/ld-button.component";
import { Navigation } from '@app/shared/utils/navigation';

@Component({
  standalone: true,
  selector: 'app-project-list',
  imports: [
    LdWrapperComponent,
    CommonModule,
    LdButtonComponent
],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})

export class ProjectListComponent implements OnInit {
  projects: IListProject[] = [];

  constructor(private projectService: ProjectService, public navigation: Navigation) {
   }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.projectService
      .GetProjects()
      .subscribe({
        next: (projects) => {
          this.projects = projects;
        },
        error: (error) => {
          Swal.fire({
            title: 'Erro!',
            text: 'Falha ao obter projetos. Tente novamente.',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      })
  };

  DeleteProject(id: string) {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Essa ação não poderá ser desfeita!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed) {
        this.projectService.DeleteProject(id).subscribe({
          next: () => {
            Swal.fire(
              'Deletado!',
              'O projeto foi deletado com sucesso.',
              'success'
            );
            this.getProjects();
          },
          error: (error) => {
            Swal.fire(
              'Erro!',
              'Falha ao deletar o projeto. Tente novamente.',
              'error'
            );
          }
        });
      }
    });
  }
}

