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

  // Form group del empleado
  public empleadoForm: FormGroup;
  // Bandera para saber cuando se da click en el boton para enviar el formulario
  public formSubmitted: boolean;
  // Event emitter cuando se registra un usuario
  @Output() empleadoRegistradoAlert = new EventEmitter<boolean>();
  
  constructor(
    protected formBuilder: FormBuilder,
    protected empleadosService: EmpleadosService
  ) { }

  /**
   * Function para registrar un nuevo empleado
   */
  registarEmpleado() {
    this.formSubmitted = true;
    // Ver el valor del formulario
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
    // Inicializar el formulario
    this.empleadoForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      last_name: ['', [Validators.required, Validators.maxLength(30)]],
      birthday: ['', [Validators.required]]
    });
  }

}
