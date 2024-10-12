import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../../../services/task.service';
import { Project } from '../../../../projects/models/projects.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent {
  task = {
    id: '',
    title: '',
    description: '',
    state: false,
    projects: []
  };

  projects: Project[] = [];
  isReadOnly = false;

  constructor(
    public dialogRef: MatDialogRef<TaskModalComponent>,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackbar: MatSnackBar
  ) {

    if (data) {
      this.isReadOnly = data.isReadOnly;
      this.task = { ...data.task };
    }
    this.loadProjects();
  }

  loadProjects() {
    this.taskService.getProjects().subscribe((projects: Project[]) => {
      this.projects = projects;
    });
  }

  save(): void {
    if (!this.task.title || this.task.title.trim() === '') {
      this.snackbar.open("El título es obligatorio.", "Cerrar", {
        panelClass: ["snackbar-error"],
        verticalPosition: "top",
        duration: 3000,
      });
      return;
    }
    const taskToSave = {
      id: this.task.id,
      title: this.task.title,
      description: this.task.description,
      state: this.task.state,
      projects: this.task.projects,
    };

    if (this.task.id) {
      this.taskService.editTask(this.task.id.toString(), taskToSave).subscribe(
        () => {
          this.dialogRef.close(true);
        },
        error => {
          this.snackbar.open("Ocurrió un error al editar la tarea.", "Cerrar", {
            panelClass: ["snackbar-error"],
            verticalPosition: "top",
            duration: 3000,
          });
        }
      );
    } else {
      this.taskService.addTask(taskToSave).subscribe(
        () => {
          this.dialogRef.close(true);
        },
        error => {
          this.snackbar.open("Ocurrió un error al agregar la tarea.", "Cerrar", {
            panelClass: ["snackbar-error"],
            verticalPosition: "top",
            duration: 3000,
          });
        }
      );
    }
  }

  close(): void {
    this.dialogRef.close(false);
  }
}
