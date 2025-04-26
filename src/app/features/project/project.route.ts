import { Routes } from "@angular/router";

const projectListComponent = () => import('./components/project-list/project-list.component').then(m => m.ProjectListComponent);

export const projectRoutes: Routes = [
    {
        path: '',
        loadComponent: projectListComponent
    }
];