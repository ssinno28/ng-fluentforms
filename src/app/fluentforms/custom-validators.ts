import {AbstractControl} from '@angular/forms';
import {isNumeric} from 'rxjs/internal-compatibility';

export function NumericFn(control: AbstractControl): { [s: string]: boolean } {
  if (!isNumeric(control.value)) {
    return {'isNumeric': true};
  } else {
    return null;
  }
}
