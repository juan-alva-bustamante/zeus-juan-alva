import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Grupo } from 'src/app/model/Grupo/grupo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  private gruposURL: string;

  constructor(
    protected http: HttpClient
  ) {
    this.gruposURL = `${environment.gruposURL}:${environment.nombre}`;
  }

  public obtenerGrupos() {
    return this.http.get(this.gruposURL).toPromise().then((response: any) => {
      console.log('grupos service response obtenerGrupos ', response);
      return response.data.groups.map((grupo) => {
        return new Grupo(grupo);
      });
    }).catch((err) => {
      console.error('grupos service error obtenerGrupos ', err);
    });
  }
}
