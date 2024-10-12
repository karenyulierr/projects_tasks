import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Project } from '../../projects/models/projects.interface';
import { Task } from '../models/task.interface';
import { HTTPErrorService } from '../../services/http-error.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = "http://localhost:3001";
  private projects: Project[] = [];
  private tasks: Task[] = [];

  constructor(private http: HttpClient, private HTTPErrorService: HTTPErrorService) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`).pipe(
      tap((data) => {
        this.projects = data;
      }),
      catchError((error) => {
        this.HTTPErrorService.handleError(error);
        throw error;
      })
    );
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      tap((data) => {
        this.tasks = data;
      }),
      catchError((error) => {
        this.HTTPErrorService.handleError(error);
        throw error;
      })
    );
  }

  getTasksWithProjectNames(): Observable<any[]> {
    if (this.tasks.length === 0) {
      return this.getTasks().pipe(
        map((tasks) => this.mapTasksToProjects(tasks))
      );
    }

    return of(this.tasks).pipe(
      map((tasks) => this.mapTasksToProjects(tasks))
    );
  }

  loadData(): Observable<any> {
    return forkJoin({
      projects: this.getProjects(),
      tasks: this.getTasks()
    }).pipe(
      tap(({ projects, tasks }) => {
        this.projects = projects;
        this.tasks = tasks;
      })
    );
  }

  private mapTasksToProjects(tasks: Task[]): any[] {
    return tasks.map((task: Task) => {
      const projectsWithDetails: { id: number; title: string }[] = [];
      if (Array.isArray(task.projects)) {
        task.projects.forEach((projectId: string) => {
          const project = this.projects.find((proj) => proj.id.toString() === projectId);
          if (project) {
            projectsWithDetails.push({ id: project.id, title: project.title });
          } else {
            projectsWithDetails.push({ id: parseInt(projectId), title: 'N/A' });
          }
        });
      }

      return {
        ...task,
        projectsWithDetails
      };
    });
  }

  addTask(task: Task): Observable<Task> {
    const highestId = this.tasks.reduce((max, t) => Math.max(max, Number(t.id)), 0);
    task.id = (highestId + 1).toString();

    return this.http.post<Task>(`${this.apiUrl}/tasks`, task).pipe(
      tap((newTask) => {
        this.tasks.push(newTask);
      }),
      catchError((error) => {
        this.HTTPErrorService.handleError(error);
        throw error;
      })
    );
  }

  editTask(id: string, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/tasks/${id}`, task).pipe(
      tap((updatedTask) => {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
          this.tasks[index] = { ...this.tasks[index], ...updatedTask };
        }
      }),
      catchError((error) => {
        this.HTTPErrorService.handleError(error);
        throw error;
      })
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tasks/${id}`).pipe(
      tap(() => {
        this.tasks = this.tasks.filter(task => Number(task.id) !== id);
      }),
      catchError((error) => {
        this.HTTPErrorService.handleError(error);
        throw error;
      })
    );
  }
}
