import {ComponentFactoryResolver, ViewContainerRef} from '@angular/core';
import {BaseFieldComponent} from '../components/basefield/basefield.component';
import {EditorOptions} from '../models/editoroptions.class';
import {IEditor} from '../interfaces/editor.interface';

export abstract class Editor<T extends BaseFieldComponent> implements IEditor {
  abstract component: any;

  private _dynamicComponent: T;
  private _viewContainerRef: ViewContainerRef;

  create(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef, options: EditorOptions): void {
    const componentFactory = componentFactoryResolver.resolveComponentFactory(this.component);
    const dynamicComponent = viewContainerRef.createComponent(componentFactory).instance as T;

    dynamicComponent.fieldName = options.fieldName;
    dynamicComponent.formGroup = options.formGroup;
    dynamicComponent.label = options.label;
    dynamicComponent.validations = options.validations;
    dynamicComponent.srOnly = options.srOnly;
    dynamicComponent.eventEmitter = options.eventEmitter;

    this._dynamicComponent = dynamicComponent;
    this._viewContainerRef = viewContainerRef;
  }

  configure(callBack: (dynamicComponent: T) => void): Editor<T> {
    callBack(this._dynamicComponent);
    return this;
  }

  disable(): Editor<T> {
    this._dynamicComponent.disabled = true;
    return this;
  }

  enable(): Editor<T> {
    this._dynamicComponent.disabled = false;
    return this;
  }
}
