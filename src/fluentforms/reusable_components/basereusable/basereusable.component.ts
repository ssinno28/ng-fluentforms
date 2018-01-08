import {OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {Validation} from '../../models/validation.class';
import {AbstractControl, FormGroup} from '@angular/forms';

export class BaseReusableComponent implements OnInit {
  @ViewChild('tpl', {read: ViewContainerRef}) tpl: ViewContainerRef;

  fieldName: string;
  formGroup: FormGroup;
  validations: Validation[];
  label: string;
  srOnly: boolean;
  errors: string[] = [];
  fieldTpl: TemplateRef<any>;
  field: any;

  onInit(ctrl: AbstractControl): void {
  }

  ngOnInit() {
    this.field = {
      field: {
        errors: this.errors,
        fieldName: this.fieldName,
        formGroup: this.formGroup,
        label: this.label,
        srOnly: this.srOnly,
        tpl: this.tpl
      }
    };

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
      for (const validation of this.validations) {
        const valid = validation.validator(ctrl);

        if (valid != null) {
          this.errors.push(validation.message);
        }
      }
    }
  }
}
