import { Component, OnInit } from '@angular/core';
import { GruposService } from 'src/app/services/grupos/grupos.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { Grupo } from 'src/app/model/Grupo/grupo';
import { EmpleadoGrupo } from 'src/app/model/EmpleadoGrupo/empleado-grupo';
import { DetalleGrupo } from 'src/app/model/DetalleGrupo/detalle-grupo';
import { Empleado } from 'src/app/model/Empleado/empleado';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {

  public allGroups: Array<Grupo>;
  public showGroup: Array<Grupo>;

  public filterGroups: Array<Grupo>;
  public detalleGrupo: Array<any>;

  constructor(
    protected gruposService: GruposService
  ) {
    this.showGroup = [];
    this.allGroups = [];
    this.detalleGrupo = [];
  }

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

  public buscarGrupo(input: string): void {
    if (input === '') {
      this.filterGroups = this.allGroups;
    } else {
      const filterValue = input;
      this.filterGroups = this.allGroups.filter(empleado => empleado.name.includes(filterValue));
    }
  }

  public activarGrupo(detalleGrupo: DetalleGrupo) {
    detalleGrupo.active = !detalleGrupo.active;
    const active = detalleGrupo.active;
    detalleGrupo.empleados.map((empleado: EmpleadoGrupo) => {
      empleado.selected = active;
    });
  }

  public mostrarSeleccionados(grupo: DetalleGrupo) {
    const empleados = grupo.empleados.filter((empleado) => empleado.selected === true);
    console.log('Empleados seleccionados ', empleados);
  }

  public async removerDeLista(grupo: DetalleGrupo) {
    this.showGroup.forEach((grupoEnLista: Grupo, index: number) => {
      if (grupoEnLista.id === grupo.id) {
        this.showGroup.splice(index, 1);
        this.allGroups.push(grupoEnLista);
      }
    });
    this.detalleGrupo = await this.obtenerDetallesDelGrupo();
  }

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
