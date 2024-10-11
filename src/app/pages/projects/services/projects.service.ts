import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Project } from "../models/projects.interface";


@Injectable({
  providedIn: "root",
})
export class ProjectsService {
  private apiUrl = "http://localhost:3001/projects";

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  addProject(projectData: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, projectData);
  }



  viewProject(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/${id}`);
  }

  editProject(id: number, projectData: Project): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, projectData);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
