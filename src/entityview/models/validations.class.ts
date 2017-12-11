import {FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import {Validation} from './validation.class';
import {CustomValidators} from '../custom-validators';

export class Validations {
  public validations: Validation[];

  required(message: string): void {
    const validation = new Validation();
    validation.message = message;
    validation.validator = Validators.required;

    this.validations.push(validation);
  }

  min(message: string, min: number): void {
    const validation = new Validation();
    validation.message = message;
    validation.validator = Validators.min;
    validation.arguments = [min];

    this.validations.push(validation);
  }

  max(message: string, max: number): void {
    const validation = new Validation();
    validation.message = message;
    validation.validator = Validators.max;
    validation.arguments = [max];

    this.validations.push(validation);
  }

  numeric(message: string): void {
    const validation = new Validation();
    validation.message = message;
    validation.validator = CustomValidators.isNumeric;

    this.validations.push(validation);
  }
}
