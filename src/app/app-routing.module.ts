import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'employer', pathMatch: 'full' },
  {
    path: 'employer',
    loadChildren: () =>
      import('./pages/employer/employer.module').then(
        (mod) => mod.EmployerModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
