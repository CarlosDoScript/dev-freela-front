import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IListProject } from "../interfaces/IListProject";
import { ICreateEditProject } from "../interfaces/ICreateEditProject";
import { CreateEditStatus } from "../enums/CreateEditStatus";
import { IProjectParams } from "../interfaces/IProjectParams";
import { IProject } from "../interfaces/IProject";

const apiUrl = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class ProjectService {

    constructor(private http: HttpClient) { }

    GetByIdProject(param: IProjectParams): Observable<IProject>{
        return this.http.get<IProject>(`${apiUrl}projects/${param.id}`);
    }

    GetProjects(): Observable<IListProject[]> {
        return this.http.get<IListProject[]>(apiUrl + 'projects')
    }

    CreateEditProject(screenType: CreateEditStatus, params: any, payload: ICreateEditProject): Observable<any> {

        const url = `${apiUrl}projects`;

        if (screenType === CreateEditStatus.edit) {
            return this.http.put(`${url}/${params?.id}`, payload);
        }

        return this.http.post(url, payload);
    }

    DeleteProject(id: string): Observable<void> {
        return this.http.delete<void>(`${apiUrl}projects/${id}`);
    }
}