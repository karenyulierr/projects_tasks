import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './pages/guards/auth.guard';
import { LayoutComponent } from './pages/layout/layout.component';
import { TasksModule } from './pages/tasks/tasks.module';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then(
        (m) => m.LoginModule
      ),
  },
  {
    path: "",
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
      {
        path: "projects",
        loadChildren: () =>
          import("./pages/projects/projects.module").then(
            (m) => m.ProjectsModule
          ),
      },
      {
        path: "tasks",
        loadChildren: () =>
          import("./pages/tasks/tasks.module").then(
            (m) => m.TasksModule
          ),
      },
      { path: '**', redirectTo: '' }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
