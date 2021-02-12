import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/model/Empleado/empleado';
import { EmpleadosService } from 'src/app/services/empleados/empleados.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: []
})
export class EmpleadosComponent implements OnInit {

  public cargandoEmpleados: boolean;
  public empleados: Empleado[];
  public empleadosTable: Empleado[];
  public buscadorEmpleados: Empleado[];
  public page = 1;
  public pageSize = 10;
  public collectionSize: number;

  constructor(
    protected empleadosService: EmpleadosService
  ) {
    this.empleados = [];
  }

  public empleadoRegistrado($event) {
    this.obtenerEmpleados();
  }

  private obtenerEmpleados() {
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

  ngOnInit(): void {
    this.obtenerEmpleados();
  }

  refreshEmpleados() {
    this.collectionSize = this.buscadorEmpleados.length;
    this.empleadosTable = this.buscadorEmpleados
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

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
}
