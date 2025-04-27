import { Injectable } from "@angular/core";
import { IUserHeader } from "@app/shared/components/ld-header/interfaces/IUserHeader";

@Injectable({
    providedIn: 'root'
})

export class AuthService{

    isLogged():boolean{
        return localStorage.getItem('userName') != null && localStorage.getItem('role') != null;
    }

    getUser():IUserHeader{
        return {
            name: localStorage.getItem('userName') ?? '',
            role: localStorage.getItem('role') ?? '',
            clientId: localStorage.getItem('idClient') ?? ''
        };
    }

    logout(): void{
        localStorage.removeItem('userName')
        localStorage.removeItem('role');
    }
}