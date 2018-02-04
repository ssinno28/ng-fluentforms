import {AbstractControl} from '@angular/forms';
import {isNumeric} from 'rxjs/util/isNumeric';

export class CustomValidators {
  public static isNumeric() {
    return (control: AbstractControl): { [s: string]: boolean } => {
      if (!isNumeric(control.value)) {
        return {'isNumeric': true};
      } else {
        return null;
      }
    };
  }
}
