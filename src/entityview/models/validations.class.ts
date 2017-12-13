import {AbstractControl, FormControl, FormGroup, Validator, Validators} from '@angular/forms';
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
    validation.validator = Validators.min(min);

    this.validations.push(validation);
  }

  max(message: string, max: number): void {
    const validation = new Validation();
    validation.message = message;
    validation.validator = Validators.max(max);

    this.validations.push(validation);
  }

  numeric(message: string): void {
    const validation = new Validation();
    validation.message = message;
    validation.validator = CustomValidators.isNumeric;

    this.validations.push(validation);
  }

  alphanum(message: string): void {
    const validation = new Validation();
    validation.message = message;
    validation.validator = Validators.pattern('^[a-zA-Z0-9]+$');

    this.validations.push(validation);
  }

  alpha(message: string): void {
    const validation = new Validation();
    validation.message = message;
    validation.validator = Validators.pattern('^[a-zA-Z]+$');

    this.validations.push(validation);
  }

  email(message: string): void {
    const validation = new Validation();
    validation.message = message;
    validation.validator = Validators.pattern('^((([a-z]|\\d|[!#\\$%&\'\\*\\+\\-\\/=\\?\\^_`{\\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\\.([a-z]|\\d|[!#\\$%&\'\\*\\+\\-\\/=\\?\\^_`{\\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\\d|-|\\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\\d|-|\\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\\.?$');

    this.validations.push(validation);
  }

  validator(message: string, validator: (control: AbstractControl) => { [s: string]: boolean }): void {
    const validation = new Validation();
    validation.message = message;
    validation.validator = validator;
  }
}
