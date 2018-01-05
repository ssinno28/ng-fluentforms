import {Editor} from './base.editor';
import {ComponentFactoryResolver, ViewContainerRef} from '@angular/core';
import {IEditor} from '../../interfaces/editor.interface';
import {NumberComponent} from '../../reusable_components/number/number.component';
import {NumberOptions} from '../options/numberoptions.class';

export class NumberEditor extends Editor implements IEditor {
  create(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef, options: NumberOptions): void {
    const component = this.createComponent(componentFactoryResolver, viewContainerRef, NumberComponent) as NumberComponent;

    component.placeholderTxt = options.placeholderTxt === undefined ? '' : options.placeholderTxt;
    component.precision = options.precision;
    component.nonNegative = options.nonNegative;
    component.fieldName = options.fieldName;
    component.formGroup = options.formGroup;
    component.label = options.label;
    component.validations = options.validations;
    component.srOnly = options.srOnly;
  }
}
