import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { emailPattern, nombreApellidoPattern, noPuedeSerStrider } from 'src/app/shared/validators/validaciones';
import { ValidatorService } from '../../../shared/validators/validator.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: []
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: [ '', [ Validators.required, Validators.pattern( this.validatorService.nombreApellidoPattern) ] ],
    email: [ '', [ Validators.required, Validators.pattern( this.validatorService.emailPattern ) ], [ this.emailValidator ] ],
    username: [ '', [ Validators.required, this.validatorService.noPuedeSerStrider ] ],
    password: [ '', [ Validators.required, Validators.minLength(6) ] ],
    password2: [ '', [ Validators.required ] ]
  }, {
    validators: [ this.validatorService.camposIguales('password', 'password2') ]
  });

  get emailErrorMsg(): string {

    const errors = this.miFormulario.get('email')?.errors;
    if ( errors?.['required'] ) {
      return 'Email es obligatorio';
    } else if ( errors?.['pattern'] ) {
      return 'El valor ingresado no tiene formato de email';
    } else if ( errors?.['emailTomado'] ) {
      return 'El email ya fue tomado';
    }

    return '';

  }

  constructor( 
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private emailValidator: EmailValidatorService ) { }

  ngOnInit() {
    this.miFormulario.reset({
      nombre: 'Jhoan Jimenez',
      email: 'test1@test.com',
      username: 'RaigaArai'
    })  
  }



  campoValido( campo: string ) {
    return  this.miFormulario.get(campo)?.invalid &&
            this.miFormulario.get(campo)?.touched
  }


  submitFormulario() {
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }

}
