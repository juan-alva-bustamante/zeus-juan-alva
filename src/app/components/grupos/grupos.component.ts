import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GruposService } from 'src/app/services/grupos/grupos.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { Grupo } from 'src/app/model/Grupo/grupo';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {

  public allGroups: Array<Grupo>;
  public showGroup: Array<Grupo>;

  public filterGroups: Array<Grupo>;

  constructor(
    protected gruposService: GruposService,
    private cdr: ChangeDetectorRef
  ) {
    this.showGroup = [];
    this.allGroups = [];
  }

  protected obtenerGrupos() {
    this.gruposService.obtenerGrupos().then((response: Array<Grupo>) => {
      console.log('grupos components obtenerGrupos response ', response);
      this.allGroups = response;
      this.filterGroups = this.allGroups;
    }).catch((err) => {

    }).finally(() => {

    });
  }

  public drop(event: CdkDragDrop<string[]>) {
    console.log('DRAG EVENT ', event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.obtenerDetallesDelGrupo();
  }

  public obtenerDetallesDelGrupo() {
    console.log('Todos los grupos ', this.allGroups);
    console.log('Detalle de grupos ', this.showGroup);
  }

  public buscarGrupo(input: string): void {
    if (input === '') {
      this.filterGroups = this.allGroups;
    } else {
      const filterValue = input;
      this.filterGroups = this.allGroups.filter(empleado => empleado.name.includes(filterValue));
    }
  }

  ngOnInit(): void {
    this.obtenerGrupos();
  }

}
