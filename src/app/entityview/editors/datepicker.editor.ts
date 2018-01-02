import {Editor} from './base.editor';
import {IEditor} from './editor.interface';
import {ComponentFactoryResolver, ViewContainerRef} from '@angular/core';
import {DatePickerOptions} from '../options/datepickeroptions.class';
import {DatePickerComponent} from '../reusable_components/datepicker/datepicker.component';

export class DatePickerEditor extends Editor implements IEditor {
  create(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef, options: DatePickerOptions): void {
    const component = this.createComponent(componentFactoryResolver, viewContainerRef, DatePickerComponent) as DatePickerComponent;

    component.displayMonths = options.displayMonths;
    component.fieldName = options.fieldName;
    component.formGroup = options.formGroup;
    component.label = options.label;
    component.validations = options.validations;
    component.srOnly = options.srOnly;
  }
}
