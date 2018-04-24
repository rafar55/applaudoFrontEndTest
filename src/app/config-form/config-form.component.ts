import { ConfigOptions } from './../Models/ConfigOptions';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';


@Component({
  selector: 'app-config-form',
  templateUrl: './config-form.component.html',
  styleUrls: ['./config-form.component.css']
})
export class ConfigFormComponent implements OnInit {
  @Input() datosIniciales: ConfigOptions;
  @Output() OnNuevaConfiguracion = new EventEmitter<ConfigOptions>();

  configForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.datosIniciales = {
      numN: 3,
      Player1: 'Rafael Romero',
      Player2: 'Fernando Romero'
    };
   }

  ngOnInit() {
    this.createForm();
  }

  private createForm(): void {
     this.configForm = this.fb.group({
      numN: [this.datosIniciales.numN, Validators.required],
      Player1: [this.datosIniciales.Player1, Validators.required],
      Player2: [this.datosIniciales.Player2, Validators.required]
     });
  }

  onSubmit(opciones: ConfigOptions): void {
    if (this.configForm.valid) {
      console.log(opciones);
      this.OnNuevaConfiguracion.emit(opciones);
    } else {
      console.log('form invalido');
    }
  }

  clearForm(): void {
      this.configForm.reset();
  }

}
