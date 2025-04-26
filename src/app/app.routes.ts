import { Routes } from '@angular/router';
import { registerRoutes } from './features/register/register.route';


export const routes: Routes = [
    {
        path: 'register',
        children: registerRoutes
    }
];
