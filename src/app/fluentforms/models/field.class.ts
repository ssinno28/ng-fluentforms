import {Validation} from './validation.class';
import {NumericFn} from '../custom-validators';
import {AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ComponentFactoryResolver, EventEmitter, ViewContainerRef} from '@angular/core';
import {IEditor} from '../interfaces/editor.interface';
import {EditorOptions} from './editoroptions.class';
import {AsyncValidation} from './asyncvalidation.class';

export class Field {

  private _eventEmitter = new EventEmitter<any>();
  private _fieldLabel: string;
  private _srOnly: boolean;
  private _validations: Validation[] = [];
  private _asyncValidations: AsyncValidation[] = [];
  private _formControl: FormControl;
  private _editor: any;

  constructor(private readonly _name: string,
              private readonly _componentFactoryResolver: ComponentFactoryResolver,
              private _fieldViewContainerRef: ViewContainerRef,
              private _fieldFormGroup: FormGroup,
              private _value: any) {
  }

  public get name(): string {
    return this._name;
  }

  public get eventEmitter(): EventEmitter<any> {
    return this._eventEmitter;
  }

  label(label: string, srOnly: boolean = false): Field {
    this._fieldLabel = label;
    this._srOnly = srOnly;
    return this;
  }

  formGroup(formGroup: FormGroup): Field {
    this._fieldFormGroup = formGroup;
    return this;
  }

  viewContainerRef(viewContainerRef: ViewContainerRef): Field {
    this._fieldViewContainerRef = viewContainerRef;
    return this;
  }

  editor<T extends IEditor>(editorType: new () => T, index?: number): T {
    const options = new EditorOptions();
    options.fieldName = this.name;
    options.formGroup = this._fieldFormGroup;
    options.label = this._fieldLabel;
    options.validations = this._validations;
    options.srOnly = this._srOnly;
    options.eventEmitter = this.eventEmitter;

    this._formControl = this._fieldFormGroup.controls[this.name] as FormControl;
    if (this._formControl === undefined) {
      this._formControl = new FormControl(this._value, this.getValidators(), this.getAsyncValidators());
      this._fieldFormGroup.addControl(this.name, this._formControl);
      this.addEditor(editorType, options, index);
    } else {
      this._formControl.setValue(this._value);
      this._formControl.setValidators(this.getValidators());
      this._formControl.setAsyncValidators(this.getAsyncValidators());

      if (this._editor.constructor.name !== editorType.name) {
        this._editor.destroy();
        this.addEditor(editorType, options, index);
      }
    }

    return this._editor;
  }

  private addEditor<T extends IEditor>(editorType: new () => T, options: EditorOptions, index?: number): T {
    const editor = new editorType();
    editor.add(this._componentFactoryResolver, this._fieldViewContainerRef, options, index);

    this._editor = editor;
    return editor;
  }

  private getValidators(): ValidatorFn {
    return Validators.compose(this._validations.map((validation) => {
      return validation.validator;
    }));
  }

  private getAsyncValidators(): AsyncValidatorFn {
    return Validators.composeAsync(this._asyncValidations.map(
      (validation) => {
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
    validation.validator = NumericFn;

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

  validator(message: string, validator: ValidatorFn): Field {
    const validation = new Validation();
    validation.message = message;
    validation.validator = validator;

    this._validations.push(validation);
    return this as Field;
  }

  asyncValidator(message: string, validator: AsyncValidatorFn): Field {
    const asyncValidation = new AsyncValidation();
    asyncValidation.message = message;
    asyncValidation.validator = validator;

    this._asyncValidations.push(asyncValidation);
    return this as Field;
  }
}
