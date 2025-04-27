import { Routes } from "@angular/router";

const projectListComponent = () => import('./components/project-list/project-list.component').then(m => m.ProjectListComponent);
const projectCreateEditComponent = () => import('./components/project-create-edit/project-create-edit.component').then(m => m.ProjectCreateEditComponent);

export const projectRoutes: Routes = [
    {
        path: '',
        loadComponent: projectListComponent
    },
    {
        path:'list',
        loadComponent: projectListComponent
    },
    {
        path:'create-edit',
        loadComponent: projectCreateEditComponent
    }
];