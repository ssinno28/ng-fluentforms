import {Component, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';
import {BaseReusableComponent} from '../basereusable/basereusable.component';
import {AbstractControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.css']
})
export class NumberComponent extends BaseReusableComponent {
  @ViewChild('input', {read: ElementRef}) input: ElementRef;

  precision?: number;
  nonNegative: boolean;
  step: string;
  placeholderTxt = '';

  onInit(ctrl: AbstractControl): void {
    this.updateStep();

    ctrl.valueChanges.subscribe(
      (value: number) => {
        if (ctrl.dirty) {
          this.updateNum(value, ctrl);
        }
      });
  }

  updateNum(val: number, ctrl: AbstractControl): void {
    let clean = val;
    if (this.nonNegative && clean < 0) {
      clean = clean * -1;
    }

    if (clean % 1 !== 0 && this.precision === undefined) {
      clean = this.truncate(clean);
    } else if (this.precision !== undefined) {
      clean = this.round(clean, this.precision);
    }

    ctrl.markAsPristine();
    ctrl.setValue(clean);
  }

  updateStep() {
    let step = '1';

    for (let i = 0; i < this.precision - 1; i++) {
      step = '0' + step;
    }

    this.step = '.' + step;
  }

  truncate(val: number): number {
    if (val < 0) {
      return Math.ceil(val);
    }

    return Math.floor(val);
  }

  round(val: number, precision: number) {
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(val * multiplier) / multiplier;
  }
}
