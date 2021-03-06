import {EventEmitter, OnInit} from '@angular/core';
import {Validation} from '../../models/validation.class';
import {AbstractControl, FormGroup} from '@angular/forms';

export abstract class BaseFieldComponent implements OnInit {
  fieldName: string;
  formGroup: FormGroup;
  validations: Validation[];
  label: string;
  srOnly: boolean;
  errors: string[] = [];
  eventEmitter: EventEmitter<any>;
  disabled = false;

  onInit(ctrl: AbstractControl): void {
  }

  ngOnInit() {
    this.errors = [];
    const ctrl = this.formGroup.get(this.fieldName);

    ctrl.valueChanges.subscribe(
      (value: string) => {
        this.isValid();
      }
    );

    this.onInit(ctrl);
  }

  isValid(): void {
    const ctrl = this.formGroup.get(this.fieldName);
    this.errors = [];

    if (ctrl.invalid && (ctrl.dirty || ctrl.touched)) {
      this.eventEmitter.emit({wasValidated: true});

      for (const validation of this.validations) {
        const valid = validation.validator(ctrl);

        if (valid != null) {
          this.errors.push(validation.message);
        }
      }
    }
  }
}
