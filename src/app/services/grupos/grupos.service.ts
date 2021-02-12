import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmpleadoGrupo } from 'src/app/model/EmpleadoGrupo/empleado-grupo';
import { Grupo } from 'src/app/model/Grupo/grupo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  // URL para peticiones del grupo
  private gruposURL: string;
  // URL para obtener los detalles del grupo
  private detalleGrupoURL: string;

  constructor(
    // Injeccion del modulo http para peticiones
    protected http: HttpClient
  ) {
    this.gruposURL = `${environment.gruposURL}:${environment.nombre}`;
    this.detalleGrupoURL = `${environment.detalleGrupoURL}:${environment.nombre}${environment.detalleGrupoPostFijo}`;
  }

  /**
   * Funcion para obtener todos los grupos
   * @returns Promise retorna una promesa con un array del modelo Grupo
   */
  public obtenerGrupos(): Promise<Array<Grupo>> {
    return this.http.get(this.gruposURL).toPromise().then((response: any) => {
      console.log('grupos service response obtenerGrupos ', response);
      return response.data.groups.map((grupo) => {
        return new Grupo(grupo);
      });
    }).catch((err) => {
      console.error('grupos service error obtenerGrupos ', err);
    });
  }

  /**
   * Funcion para obtener los detalles de un grupo
   * @param grupo recice un modelo de Grupo para obtener los detalles
   * @returns Promise retorna una promesa con un array de modelos de EmpleadoGrupo
   */
  public async obtenerDetalleGrupo(grupo: Grupo): Promise<Array<EmpleadoGrupo>> {
    return await this.http.get(`${this.detalleGrupoURL}${grupo.id}`).toPromise().then((response: any) => {
      console.log('grupos service response obtenerDetalleGrupo ', response);
      return response.data.employees.map((responseData) => {
        return new EmpleadoGrupo(responseData);
      });
    }).catch((err) => {
      console.error('grupos service error obtenerDetalleGrupo ', err);
      return [];
    });
  }
}
