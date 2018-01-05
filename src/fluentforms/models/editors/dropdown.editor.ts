import {Editor} from './base.editor';
import {ComponentFactoryResolver, ViewContainerRef} from '@angular/core';
import {IEditor} from '../../interfaces/editor.interface';
import {DropdownOptions} from '../options/dropdownoptions.class';
import {DropdownComponent} from '../../reusable_components/dropdown/dropdown.component';

export class DropdownEditor extends Editor implements IEditor {
  create(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef, options: DropdownOptions): void {
    const component = this.createComponent(componentFactoryResolver, viewContainerRef, DropdownComponent) as DropdownComponent;

    component.placement = options.placement;
    component.selectItems = options.selectItems;
    component.fieldName = options.fieldName;
    component.formGroup = options.formGroup;
    component.label = options.label;
    component.validations = options.validations;
    component.srOnly = options.srOnly;
  }
}
