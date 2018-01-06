import {FormGroup} from '@angular/forms';
import {Validation} from '../validation.class';

export class EditorOptions {
  fieldName: string;
  formGroup: FormGroup;
  label: string;
  validations: Validation[];
  srOnly: boolean;
}
