import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Importacion de componentes
import { InicioComponent } from './components/inicio/inicio.component';
import { GruposComponent } from './components/grupos/grupos.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormularioComponent } from './components/empleados/formulario/formulario.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    GruposComponent,
    EmpleadosComponent,
    NavbarComponent,
    FormularioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    DragDropModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
