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

  public obtenerEmpleados(): Promise<Empleado[]> {
    return this.http.get(this.empleadoURL).toPromise().then((response: any) => {
      console.log('empleados service response obtenerEmpleados ', response);
      return response.data.employees.map((employee) => {
        return new Empleado(employee);
      });
    }).catch((err) => {
      console.error('empleados service error obtenerEmpleados ', err);
    });
  }

  public registrarEmpleado(empleado: any): Promise<any> {
    return this.http.post(this.empleadoURL, empleado).toPromise().then((response: any) => {
      console.log('empleados service response registrarEmpleado ', response);
      return response.data;
    }).catch((err) => {
      console.error('empleados service error registrarEmpleado ', err);
    });
  }
}
