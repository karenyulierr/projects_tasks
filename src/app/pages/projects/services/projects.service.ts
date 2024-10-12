import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { Project } from "../models/projects.interface";
import { Task } from "../../tasks/models/task.interface";
import { HTTPErrorService } from "../../services/http-error.service";


@Injectable({
  providedIn: "root",
})
export class ProjectsService {
  private apiUrl = "http://localhost:3001/projects";

  constructor(private http: HttpClient, private HTTPErrorService: HTTPErrorService) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl).pipe(
      catchError((error) => {
        this.HTTPErrorService.handleError(error);
        throw error;
      })
    );
  }

  addProject(projectData: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, projectData).pipe(
      catchError((error) => {
        this.HTTPErrorService.handleError(error);
        throw error;
      })
    );
  }

  viewProject(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        this.HTTPErrorService.handleError(error);
        throw error;
      })
    );
  }

  editProject(id: number, projectData: Project): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, projectData).pipe(
      catchError((error) => {
        this.HTTPErrorService.handleError(error);
        throw error;
      })
    );
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        this.HTTPErrorService.handleError(error);
        throw error;
      })
    );
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('http://localhost:3001/tasks').pipe(
      catchError((error) => {
        this.HTTPErrorService.handleError(error);
        throw error;
      })
    );
  }

}
