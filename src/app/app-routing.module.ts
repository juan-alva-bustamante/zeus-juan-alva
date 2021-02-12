import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { GruposComponent } from './components/grupos/grupos.component';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent,
    // loadChildren: () => import('./components/inicio/').then(m => m.HomePractitionerModule)
  },
  {
    path: 'empleados',
    component: EmpleadosComponent
  },
  {
    path: 'grupos',
    component: GruposComponent
  },
  {
    path: '**',
    component: InicioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
