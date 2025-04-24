import { Injectable } from "@angular/core";
import { IUser } from "../features/ld-header/interfaces/IUser";

@Injectable({
    providedIn: 'root'
})

export class AuthService{

    isLogged():boolean{
        return localStorage.getItem('userName') != null && localStorage.getItem('role') != null;
    }

    getUser():IUser{
        return {
            name: localStorage.getItem('userName') ?? '',
            role: localStorage.getItem('role') ?? ''
        };
    }

    logout(): void{
        localStorage.removeItem('userName')
        localStorage.removeItem('role');
    }
}