import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IListProject } from "../interfaces/IListProject";


const apiUrl = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class ProjectService {

    constructor(private http: HttpClient) { }

    GetProjects(): Observable<IListProject[]> {
        return this.http.get<IListProject[]>(apiUrl + 'projects')
    }

    DeleteProject(id: number): Observable<void> {
        return this.http.delete<void>(`${apiUrl}projects/${id}`);
    }

}