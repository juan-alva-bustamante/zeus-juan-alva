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

  constructor(
    // Injeccion del modulo http para peticiones
    protected http: HttpClient
  ) {
    this.empleadoURL = `${environment.empleadosURL}:${environment.nombre}`;
  }

  /**
   * Function para obtener todos los empleados
   * @return Promise retorna una promesa con un array de empleados
   */
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

  /**
   * Funcion para registrar un nuevo empeleado
   * @param empleado el valor del empleado 
   * Request:
   * ▪ name
   * ▪ last_name
   * ▪ birthday
   */
  public registrarEmpleado(empleado: any): Promise<any> {
    return this.http.post(this.empleadoURL, empleado).toPromise().then((response: any) => {
      console.log('empleados service response registrarEmpleado ', response);
      return response.data;
    }).catch((err) => {
      console.error('empleados service error registrarEmpleado ', err);
    });
  }
}
