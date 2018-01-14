import {FormGroup} from '@angular/forms';
import {Validation} from './validation.class';
import {EventEmitter} from '@angular/core';

export class EditorOptions {
  fieldName: string;
  formGroup: FormGroup;
  label: string;
  validations: Validation[];
  srOnly: boolean;
  eventEmitter: EventEmitter<any>;
}
