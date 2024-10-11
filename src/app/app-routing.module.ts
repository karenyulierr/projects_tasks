import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './pages/guards/auth.guard';
import { LayoutComponent } from './pages/layout/layout.component';


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
        path: "projects1",
        loadChildren: () =>
          import("./pages/projects/projects.module").then(
            (m) => m.ProjectsModule
          ),
      },
      {
        path: "projects2",
        loadChildren: () =>
          import("./pages/projects/projects.module").then(
            (m) => m.ProjectsModule
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
