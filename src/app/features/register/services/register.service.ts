import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { IUser } from "../interfaces/IUser";

const apiUrl = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class RegisterService {

    constructor(private http: HttpClient) { }

    postUser(payload: IUser): Observable<any> {
        return this.http.post(apiUrl + '/users', payload);
    }
}