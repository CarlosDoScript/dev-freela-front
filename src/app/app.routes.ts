import { Routes } from '@angular/router';
import { registerRoutes } from './features/register/register.route';
import { projectRoutes } from './features/project/project.route';

export const routes: Routes = [
    {
        path: 'register',
        children: registerRoutes
    },
    {
        path: 'project/list',
        children: projectRoutes
    }
];
