import { Route, Routes } from "@angular/router";

const registerPage = () => import('./register.component').then(m => m.RegisterComponent);

export const registerRoutes: Routes = [
    {
        path: '',
        loadComponent: registerPage
    }
];