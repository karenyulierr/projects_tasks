import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectsService } from './services/projects.service';
import { Project } from './models/projects.interface';
import { MatDialog } from '@angular/material/dialog';
import { ProjectModalComponent } from './shared/modal/project-modal/project-modal.component';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'description', 'options'];
  dataSource: MatTableDataSource<Project>;
  moduleTitle = 'Proyectos';
  projects: Project[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private projectsService: ProjectsService, public dialog: MatDialog,     private snackbar: MatSnackBar) {
    this.dataSource = new MatTableDataSource<Project>(this.projects);
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.projectsService.getProjects().subscribe(
      (data) => {
        this.projects = data;
        this.dataSource.data = this.projects;
      },
      (error) => {
        console.error("Error al obtener los proyectos:", error);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openModal(project?: Project): void {
    const dialogRef = this.dialog.open(ProjectModalComponent, {
      width: '400px',
      data: { project }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (project) {
          // Editar proyecto
          this.projectsService.editProject(project.id, result).subscribe({
            next: () => {
              this.loadProjects();
              this.snackbar.open(
                "Proyecto editado con éxito.",
                "cerrar",
                {
                  panelClass: ["snackbar-succeses"],
                  verticalPosition: "top",
                  duration: 2000,
                }
              );
            },
            error: (err) => {
              console.error('Error al editar el proyecto:', err);
              this.snackbar.open(
                "Ocurrió un error inesperado al editar el proyecto.",
                "cerrar",
                {
                  panelClass: ["snackbar-error"],
                  verticalPosition: "top",
                  duration: 4000,
                }
              );
            }
          });
        } else {
          // Agregar proyecto
          const maxId = this.projects.length > 0 ? Math.max(...this.projects.map(p => Number(p.id))) : 0;
          result.id = (maxId + 1).toString();

          this.projectsService.addProject(result).subscribe({
            next: () => {
              this.loadProjects();
              this.snackbar.open(
                "Proyecto agregado con éxito.",
                "cerrar",
                {
                  panelClass: ["snackbar-succeses"],
                  verticalPosition: "top",
                  duration: 2000,
                }
              );
            },
            error: (err) => {
              console.error('Error al agregar el proyecto:', err);
              this.snackbar.open(
                "Ocurrió un error inesperado al agregar el proyecto.",
                "cerrar",
                {
                  panelClass: ["snackbar-error"],
                  verticalPosition: "top",
                  duration: 4000,
                }
              );
            }
          });
        }
      }
    });
  }



  viewProject(id: number) {
    console.log(`Ver proyecto con ID: ${id}`);
  }

  editProject(id: number) {
    const projectToEdit = this.projects.find(p => p.id === id);
    this.openModal(projectToEdit);
  }

  deleteProject(id: number) {
    // console.log(`Eliminar proyecto con ID: ${id}`);
    // this.projectsService.deleteProject(id).subscribe(() => {
    //   this.loadProjects();
    // });
    console.log(`Eliminar proyecto con ID: ${id}`);
  }
}
