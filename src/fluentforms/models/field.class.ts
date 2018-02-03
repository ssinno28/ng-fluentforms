import {Validation} from './validation.class';
import {CustomValidators} from '../custom-validators';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {ComponentFactoryResolver, EventEmitter, ViewContainerRef} from '@angular/core';
import {IEditor} from '../interfaces/editor.interface';
import {EditorOptions} from './editoroptions.class';

export class Field {
  public name: string;
  public fieldViewContainerRef: ViewContainerRef;
  public fieldFormGroup: FormGroup;
  public eventEmitter = new EventEmitter<any>();

  private _fieldLabel: string;
  private _srOnly: boolean;
  private _value: any;
  private _validations: Validation[] = [];

  // private _conditionals: () => boolean[] = [];

  constructor(private readonly _componentFactoryResolver: ComponentFactoryResolver) {
  }

  label(label: string, srOnly: boolean = false): Field {
    this._fieldLabel = label;
    this._srOnly = srOnly;
    return this;
  }

  formGroup(formGroup: FormGroup): Field {
    this.fieldFormGroup = formGroup;
    return this;
  }

  viewContainerRef(viewContainerRef: ViewContainerRef): Field {
    this.fieldViewContainerRef = viewContainerRef;
    return this;
  }

  editor<T extends IEditor>(editorType: new () => T): T {
    const options = new EditorOptions();
    options.fieldName = this.name;
    options.formGroup = this.fieldFormGroup;
    options.label = this._fieldLabel;
    options.validations = this._validations;
    options.srOnly = this._srOnly;
    options.eventEmitter = this.eventEmitter;

    const editor = new editorType();
    editor.create(this._componentFactoryResolver, this.fieldViewContainerRef, options);
    this.fieldFormGroup.addControl(this.name, new FormControl(this._value, this.getValidators()));
    return editor;
  }

  getValidators(): ValidatorFn {
    return Validators.compose(this._validations.map((validation) => {
      return validation.validator;
    }));
  }

  required(message: string): Field {
    const validation = new Validation();
    validation.message = message;
    validation.validator = Validators.required;

    this._validations.push(validation);
    return this;
  }

  min(message: string, min: number): Field {
    const validation = new Validation();
    validation.message = message;
    validation.validator = Validators.min(min);

    this._validations.push(validation);
    return this;
  }

  max(message: string, max: number): Field {
    const validation = new Validation();
    validation.message = message;
    validation.validator = Validators.max(max);

    this._validations.push(validation);
    return this;
  }

  numeric(message: string): Field {
    const validation = new Validation();
    validation.message = message;
    validation.validator = CustomValidators.isNumeric;

    this._validations.push(validation);
    return this;
  }

  alphanum(message: string): Field {
    const validation = new Validation();
    validation.message = message;
    validation.validator = Validators.pattern('^[a-zA-Z0-9]+$');

    this._validations.push(validation);
    return this;
  }

  alpha(message: string): Field {
    const validation = new Validation();
    validation.message = message;
    validation.validator = Validators.pattern('^[a-zA-Z]+$');

    this._validations.push(validation);
    return this;
  }

  email(message: string): Field {
    const validation = new Validation();
    validation.message = message;
    validation.validator = Validators.pattern('^((([a-z]|\\d|[!#\\$%&\'\\*\\+\\-\\/=\\?\\^_`{\\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\\.([a-z]|\\d|[!#\\$%&\'\\*\\+\\-\\/=\\?\\^_`{\\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\\d|-|\\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\\d|-|\\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\\.?$');

    this._validations.push(validation);
    return this;
  }

  validator(message: string, validator: (control: AbstractControl) => { [s: string]: boolean }): Field {
    const validation = new Validation();
    validation.message = message;
    validation.validator = validator;
    return this as Field;
  }

  /*  conditional(conditional: () => boolean): Field {
      this._conditionals.push(conditional());
      return this as Field;
    }*/
}
