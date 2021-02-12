import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadosService } from 'src/app/services/empleados/empleados.service';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: []
})
export class FormularioComponent implements OnInit {

  public empleadoForm: FormGroup;
  public formSubmitted: boolean;
  @Output() empleadoRegistradoAlert = new EventEmitter<boolean>();
  
  constructor(
    protected formBuilder: FormBuilder,
    protected empleadosService: EmpleadosService
  ) { }

  registarEmpleado() {
    this.formSubmitted = true;
    console.log('form value ', this.empleadoForm);

    if (this.empleadoForm.invalid) { return; }

    // Send date in format YYYY/MM/DD
    console.log('registar empleado ', this.empleadoForm.value);

    this.empleadosService.registrarEmpleado(this.empleadoForm.value)
      .then((response) => {
        console.log('formulario componenent response ', response);
        this.empleadoRegistradoAlert.emit(true);
        Swal.fire({
          icon: 'success',
          title: 'Empleado Registrado Exitosamente',
          showConfirmButton: true,
          timer: 1500
        });
      })
      .catch((err) => {
        console.error('formulario componenent response error ', err);
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error al registrar el empleado',
          showConfirmButton: true,
          timer: 1500
        });
      })
      .finally(() => {
        this.formSubmitted = false;
        this.empleadoForm.reset();
      });
  }


  ngOnInit(): void {
    this.empleadoForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      last_name: ['', [Validators.required, Validators.maxLength(30)]],
      birthday: ['', [Validators.required]]
    });
  }

}
