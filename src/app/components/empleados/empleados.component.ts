import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/model/Empleado/empleado';
import { EmpleadosService } from 'src/app/services/empleados/empleados.service';
import { environment } from 'src/environments/environment';
import * as Moment from 'moment';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: []
})
export class EmpleadosComponent implements OnInit {

  // Bandera para saber si esta cargando los empleados
  public cargandoEmpleados: boolean;
  // Array con todos los empeados
  public empleados: Empleado[];
  // Array con los empleados para mostrar en la tabla
  public empleadosTable: Empleado[];
  // Array con los empleados buscados en el input
  public buscadorEmpleados: Empleado[];
  // El total de paginas en el paginador
  public page: number;
  // Candidad de resultados a mostrar en cada pagina
  public pageSize: number;
  // El tamaño de la collecion de empleados
  public collectionSize: number;

  constructor(
    protected empleadosService: EmpleadosService
  ) {
    this.empleados = [];
    this.page = environment.pagination.page;
    this.pageSize = environment.pagination.pageSize;
  }

  /**
   * Funcion que se ejecuta cuando se registra un usuario
   * Viene desde formulario.component.ts
   * @param $event el evento cuando se registra un usuario
   */
  public empleadoRegistrado($event): void {
    this.obtenerEmpleados();
  }

  /**
   * Funcion para obtener todos los empleados
   */
  private obtenerEmpleados(): void {
    this.cargandoEmpleados = true;
    this.empleadosService.obtenerEmpleados().then((response: Array<Empleado>) => {
      console.log('empleados component obtener empleados response ', response);
      this.empleados = response;
      this.buscadorEmpleados = this.empleados;
    }).catch((err) => {
      console.log('empleados component obtener empleados response error ', err);
    }).finally(() => {
      this.cargandoEmpleados = false;
      this.refreshEmpleados();
    });
  }

  /**
   * REcarga de empleados cuando se cambia de pagina en la tabla
   */
  refreshEmpleados(): void {
    this.collectionSize = this.buscadorEmpleados.length;
    this.empleadosTable = this.buscadorEmpleados
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  /**
   * Funcion para filtrar los empleados ingresados en el input
   * @param input el valor ingresado en el input
   */
  buscarEmpleado(input: string): void {
    if (input === '') {
      this.buscadorEmpleados = this.empleados;
      this.refreshEmpleados();
    } else {
      const filterValue = input;
      this.buscadorEmpleados = this.empleados.filter(empleado => empleado.name.includes(filterValue));
      this.refreshEmpleados();
    }
  }

  public parseEpochFormatDate(date: number): string {
    const dateMoment = Moment(date).add(1, 'day');

    return `${dateMoment.date()}/${dateMoment.month() + 1}/${dateMoment.year()}`;
  }

  ngOnInit(): void {
    this.obtenerEmpleados();
  }
}
