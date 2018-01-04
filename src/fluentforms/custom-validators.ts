import {AbstractControl} from '@angular/forms';
import * as _ from 'lodash';

export class CustomValidators {
  public static isNumeric() {
    return (control: AbstractControl): { [s: string]: boolean } => {
      if (!_.isNaN(control.value)) {
        return {'isNumeric': true};
      } else {
        return null;
      }
    };
  }
}
