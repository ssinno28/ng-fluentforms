import {Editor} from './base.editor';
import {ComponentFactoryResolver, ViewContainerRef} from '@angular/core';
import {SingleLineTextComponent} from '../reusable_components/singlelinetext/singlelinetext.component';
import {IEditor} from './editor.interface';
import {SingleLineOptions} from '../options/singlelineoptions.class';

export class SingleLineEditor extends Editor implements IEditor {
  create(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef, options: SingleLineOptions): void {
    const component = this.createComponent(componentFactoryResolver, viewContainerRef, SingleLineTextComponent) as SingleLineTextComponent;

    component.placeholderTxt = options.placeholderTxt;
    component.fieldName = options.fieldName;
    component.formGroup = options.formGroup;
    component.label = options.label;
    component.validations = options.validations;
    component.srOnly = options.srOnly;
  }
}
