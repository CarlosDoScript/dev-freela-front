import { Routes } from '@angular/router';
import { registerRoutes } from './pages/register/register.route';


export const routes: Routes = [
    {
        path: 'register',
        children: registerRoutes
    }
];
