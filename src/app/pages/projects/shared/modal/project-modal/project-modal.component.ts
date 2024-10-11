import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../../../models/projects.interface';


@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.css']
})
export class ProjectModalComponent implements OnInit {
  project: Project = { id: 0, title: '', description: '' };

  constructor(
    public dialogRef: MatDialogRef<ProjectModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { project: Project }
  ) {}

  ngOnInit(): void {
    if (this.data.project) {
      this.project = { ...this.data.project };
    }
  }

  save(): void {
    this.dialogRef.close(this.project);
  }

  close(): void {
    this.dialogRef.close();
  }
}
