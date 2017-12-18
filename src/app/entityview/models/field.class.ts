import {Validation} from './validation.class';
import {CustomValidators} from '../custom-validators';
import {AbstractControl, Validators} from '@angular/forms';
import {SingleLineTextComponent} from '../reusable_components/singlelinetext/singlelinetext.component';

export class Field {
  public name: string;
  public editor: any;
  public validations: Validation[];

  constructor() {
    this.validations = new Array<Validation>();
  }

  singleline(placeholderTxt: string): void {
    this.editor = typeof(SingleLineTextComponent);
  }

  required(message: string): Field {
    const validation = new Validation();
    validation.message = message;
    validation.validator = Validators.required;

    this.validations.push(validation);
    return this;
  }

  min(message: string, min: number): Field {
    const validation = new Validation();
    validation.message = message;
    validation.validator = Validators.min(min);

    this.validations.push(validation);
    return this;
  }

  max(message: string, max: number): Field {
    const validation = new Validation();
    validation.message = message;
    validation.validator = Validators.max(max);

    this.validations.push(validation);
    return this;
  }

  numeric(message: string): Field {
    const validation = new Validation();
    validation.message = message;
    validation.validator = CustomValidators.isNumeric;

    this.validations.push(validation);
    return this;
  }

  alphanum(message: string): Field {
    const validation = new Validation();
    validation.message = message;
    validation.validator = Validators.pattern('^[a-zA-Z0-9]+$');

    this.validations.push(validation);
    return this;
  }

  alpha(message: string): Field {
    const validation = new Validation();
    validation.message = message;
    validation.validator = Validators.pattern('^[a-zA-Z]+$');

    this.validations.push(validation);
    return this;
  }

  email(message: string): Field {
    const validation = new Validation();
    validation.message = message;
    validation.validator = Validators.pattern('^((([a-z]|\\d|[!#\\$%&\'\\*\\+\\-\\/=\\?\\^_`{\\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\\.([a-z]|\\d|[!#\\$%&\'\\*\\+\\-\\/=\\?\\^_`{\\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\\d|-|\\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\\d|-|\\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\\.?$');

    this.validations.push(validation);
    return this;
  }

  validator(message: string, validator: (control: AbstractControl) => { [s: string]: boolean }): Field {
    const validation = new Validation();
    validation.message = message;
    validation.validator = validator;
    return this as Field;
  }
}
