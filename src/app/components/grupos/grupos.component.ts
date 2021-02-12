import { Component, OnInit } from '@angular/core';
import { GruposService } from 'src/app/services/grupos/grupos.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { Grupo } from 'src/app/model/Grupo/grupo';
import { EmpleadoGrupo } from 'src/app/model/EmpleadoGrupo/empleado-grupo';
import { DetalleGrupo } from 'src/app/model/DetalleGrupo/detalle-grupo';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {

  // Listado de todos los grupos
  public allGroups: Array<Grupo>;
  // Grupos en columna derecha
  public showGroup: Array<Grupo>;
  // Filtado para mostrar detalles de grupo
  public filterGroups: Array<Grupo>;
  // Detalle del grupo
  public detalleGrupo: Array<DetalleGrupo>;

  constructor(
    protected gruposService: GruposService
  ) {
    this.showGroup = [];
    this.allGroups = [];
    this.detalleGrupo = [];
  }

  /**
   * Function para obtener todos los grupos
   */
  protected obtenerGrupos() {
    this.gruposService.obtenerGrupos().then((response: Array<Grupo>) => {
      console.log('grupos components obtenerGrupos response ', response);
      this.allGroups = response;
      this.filterGroups = this.allGroups;
    }).catch((err) => {
      console.log('grupos components obtenerGrupos error ', err);
    }).finally(() => {

    });
  }

  /**
   * Drang and drop funcion para obtener el evento
   * @param event el evento del drop
   */
  public async drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.detalleGrupo = await this.obtenerDetallesDelGrupo();
  }

  /**
   * Funciton para obtener los detalles de los grupos
   */
  public async obtenerDetallesDelGrupo() {
    return await Promise.all(this.showGroup.map(async grupo => {
      return new DetalleGrupo({
        id: grupo.id,
        name: grupo.name,
        active: true,
        empleados: await this.gruposService.obtenerDetalleGrupo(grupo)
      });
    }));
  }

  /**
   * Funcion para filtrar los grupos
   * @param input el input del grupo a buscar
   */
  public buscarGrupo(input: string): void {
    if (input === '') {
      this.filterGroups = this.allGroups;
    } else {
      const filterValue = input;
      this.filterGroups = this.allGroups.filter(empleado => empleado.name.includes(filterValue));
    }
  }

  /**
   * Function para activar o desactivar todos los elementos (checkbox) de una lista de empleados de un grupo
   * @param detalleGrupo se obtiene un modelo de DetalleGrupo
   */
  public activarGrupo(detalleGrupo: DetalleGrupo) {
    detalleGrupo.active = !detalleGrupo.active;
    const active = detalleGrupo.active;
    detalleGrupo.empleados.map((empleado: EmpleadoGrupo) => {
      empleado.selected = active;
    });
  }

  /**
   * Funcion para mostrar los empleados seleccionados en un grupo
   * @param grupo el grupo para mostrar
   */
  public mostrarSeleccionados(grupo: DetalleGrupo) {
    const empleados = grupo.empleados.filter((empleado) => empleado.selected === true);
    console.log('Empleados seleccionados ', empleados);
  }

  /**
   * Funcion para remover un grupo de la lista
   * @param grupo el grupo a remover
   */
  public async removerDeLista(grupo: DetalleGrupo) {
    this.showGroup.forEach((grupoEnLista: Grupo, index: number) => {
      if (grupoEnLista.id === grupo.id) {
        this.showGroup.splice(index, 1);
        this.allGroups.push(grupoEnLista);
      }
    });
    this.detalleGrupo = await this.obtenerDetallesDelGrupo();
  }

  /**
   * Funcion para mostrar todos los empleados seleccionados en la lista de gruopos
   */
  public mostrarTodosSeleccionados() {
    this.detalleGrupo.forEach((grupo: DetalleGrupo) => {
      const empleados = grupo.empleados.filter((empleado) => empleado.selected === true);
      console.log(`Empleados seleccionados en grupo ${grupo.name}: `, empleados);
    });
  }

  ngOnInit(): void {
    this.obtenerGrupos();
  }

}
