import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Empleado } from 'src/app/model/Empleado/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  // URL para obetenr los empleados
  private empleadoURL: string;
  private nombre: string;

  constructor(
    protected http: HttpClient
  ) {
    this.nombre = environment.nombre;
    this.empleadoURL = `${environment.empleadosURL}:${this.nombre}`;
  }

  public obtenerEmpleados(): Promise<any> {
    return this.http.get(this.empleadoURL).toPromise().then((response: any) => {
      console.log('empleadis service response obtenerEmpleados ', response);
      return response.data.employees.map((employee) => {
        return new Empleado(employee);
      });
    }).catch((err) => {
      console.error('empleadis service error obtenerEmpleados ', err);
    });
  }
}
