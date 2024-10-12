import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../../../models/projects.interface';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.css']
})

export class ProjectModalComponent implements OnInit {
  project: Project = { id: 0, title: '', description: '' };
  isReadOnly: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ProjectModalComponent>,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { project: Project, readOnly: boolean }
  ) { }

  ngOnInit(): void {
    if (this.data.project) {
      this.project = { ...this.data.project };
    }
    this.isReadOnly = this.data.readOnly || false;
  }

  save(): void {
    if (!this.project.title || this.project.title.trim() === '') {
      this.snackbar.open("El título del proyecto es obligatorio.", "Cerrar", {
        panelClass: ["snackbar-error"],
        verticalPosition: "top",
        duration: 3000,
      });
      return;
    }

    if (!this.isReadOnly) {
      this.dialogRef.close(this.project);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}

