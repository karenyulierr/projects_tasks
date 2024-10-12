import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from './services/task.service';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from './models/task.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Project } from '../projects/models/projects.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteModalComponent } from '../shared/modal/confirm-delete-modal/confirm-delete-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskModalComponent } from './shared/modal/task-modal/task-modal.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'state','projects','options'];
  dataSource: MatTableDataSource<Task>;
  tasks: any[] = [];
  moduleTitle = 'Tareas';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private taskService: TaskService, private dialog: MatDialog, private snackbar: MatSnackBar) {
    this.dataSource = new MatTableDataSource<Task>(this.tasks);
  }

  ngOnInit(): void {
    this.loadTask();
  }

  loadTask() {
    this.taskService.loadData().subscribe(() => {
      this.taskService.getTasksWithProjectNames().subscribe((tasks: Task[]) => {
        this.tasks = tasks.map(task => ({
          ...task,
          projectTitles: task.projectsWithDetails && task.projectsWithDetails.length > 0
            ? task.projectsWithDetails.map((project: Project) => project.title).join(', ')
            : 'NO APLICA'
        }));

        this.dataSource.data = this.tasks;
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
        if (this.sort) {
          this.dataSource.sort = this.sort;
        }
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openModal() {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '500px',
      data: { task: {}, isReadOnly: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackbar.open(
          "Tarea agregar con éxito.",
          "cerrar",
          {
            panelClass: ["snackbar-succeses"],
            verticalPosition: "top",
            duration: 2000,
          }
        );
        this.loadTask();
      }
    });
  }

  viewTask(id: number): void {
    const taskToView = this.tasks.find(task => task.id === id);

    if (taskToView) {
      const dialogRef = this.dialog.open(TaskModalComponent, {
        width: '500px',
        data: { task: taskToView, isReadOnly: true }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.loadTask();
        }
      });
    }
  }


  editTask(id: number) {
    const taskToEdit = this.tasks.find(task => task.id === id);

    if (taskToEdit) {
      const dialogRef = this.dialog.open(TaskModalComponent, {
        width: '500px',
        data: { task: { ...taskToEdit }, isReadOnly: false }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.snackbar.open(
            "Tarea editada con éxito.",
            "cerrar",
            {
              panelClass: ["snackbar-succeses"],
              verticalPosition: "top",
              duration: 2000,
            }
          );
          this.loadTask();
        }
      });
    }
  }

  deleteTask(id: number): void {
    const taskToDelete = this.tasks.find(t => t.id === id);

    const dialogRef = this.dialog.open(ConfirmDeleteModalComponent, {
      data: {
        type: 'task',
        name: taskToDelete?.title
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.deleteTask(id).subscribe(() => {
          this.loadTask();
          this.snackbar.open(
            "Tarea eliminada con éxito.",
            "cerrar",
            {
              panelClass: ["snackbar-succeses"],
              verticalPosition: "top",
              duration: 2000,
            }
          );
        }, error => {
          console.error('Error al eliminar la tarea:', error);
          this.snackbar.open(
            "Ocurrió un error al eliminar la tarea.",
            "cerrar",
            {
              panelClass: ["snackbar-error"],
              verticalPosition: "top",
              duration: 4000,
            }
          );
        });
      }
    });
  }
}
