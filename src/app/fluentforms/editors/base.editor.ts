import {ComponentFactoryResolver, ViewContainerRef} from '@angular/core';
import {BaseFieldComponent} from '../components/basefield/basefield.component';
import {EditorOptions} from '../models/editoroptions.class';
import {IEditor} from '../interfaces/editor.interface';
import {ComponentRef} from '@angular/core/src/linker/component_factory';

export abstract class Editor<T extends BaseFieldComponent> implements IEditor {
  abstract component: any;

  protected dynamicComponent: T;
  protected viewContainerRef: ViewContainerRef;
  protected componentRef: ComponentRef<any>;

  add(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef, options: EditorOptions, index?: number): void {
    const componentFactory = componentFactoryResolver.resolveComponentFactory(this.component);
    this.componentRef = viewContainerRef.createComponent(componentFactory, index);
    this.dynamicComponent = this.componentRef.instance as T;

    this.dynamicComponent.fieldName = options.fieldName;
    this.dynamicComponent.formGroup = options.formGroup;
    this.dynamicComponent.label = options.label;
    this.dynamicComponent.validations = options.validations;
    this.dynamicComponent.srOnly = options.srOnly;
    this.dynamicComponent.eventEmitter = options.eventEmitter;

    this.viewContainerRef = viewContainerRef;
  }

  getIndex(): number {
    return this.viewContainerRef.indexOf(this.componentRef.hostView);
  }

  remove() {
    const formGroup = this.dynamicComponent.formGroup;
    const controlName = this.dynamicComponent.fieldName;

    formGroup.removeControl(controlName);
    this.componentRef.destroy();
  }

  configure(callBack: (dynamicComponent: T) => void): Editor<T> {
    callBack(this.dynamicComponent);
    return this;
  }

  disable(): Editor<T> {
    this.dynamicComponent.disabled = true;
    return this;
  }

  enable(): Editor<T> {
    this.dynamicComponent.disabled = false;
    return this;
  }
}
