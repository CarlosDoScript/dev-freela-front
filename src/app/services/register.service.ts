import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

interface UserPayload{
    role: string;
    fullName: string;
    birthDate: string;
    email: string;
    password: string;
}

const apiUrl = environment.apiUrl;

@Injectable({providedIn: 'root'})
export class RegisterService{
    
    constructor(private http: HttpClient) {}

    cadastrar(payload: UserPayload): Observable<any>{
        return this.http.post(apiUrl+'/users',payload);
    }
}