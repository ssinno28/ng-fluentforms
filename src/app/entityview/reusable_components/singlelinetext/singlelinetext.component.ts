import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Validation} from '../../models/validation.class';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-singlelinetext',
  templateUrl: './singlelinetext.component.html',
  styleUrls: ['./singlelinetext.component.css']
})
export class SingleLineTextComponent implements OnInit {

  @Input()
  placeholderTxt: string;

  @Input()
  fieldName: string;

  @Input()
  formGroup: FormGroup;

  @Input()
  validations: Validation[];

  @Input()
  label: string;

  @Input()
  srOnly: boolean;

  errors: Validation[];
  hasErrors: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  isValid(): void {
    const ctrl = this.formGroup.get(this.fieldName);
    this.errors = new Array<Validation>();

    if (ctrl.invalid && (ctrl.dirty || ctrl.touched)) {
      this.hasErrors = true;
      for (const validation of this.validations) {
        const valid = validation.validator(ctrl);

        if (valid != null) {
          this.errors.push(validation);
        }
      }

      return;
    }

    this.hasErrors = false;
  }
}
