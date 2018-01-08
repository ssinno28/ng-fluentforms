import {ComponentFactoryResolver, Type, ViewContainerRef} from '@angular/core';
import {BaseReusableComponent} from '../reusable_components/basereusable/basereusable.component';
import {EditorOptions} from '../models/editoroptions.class';
import {IEditor} from '../interfaces/editor.interface';

export abstract class Editor<T extends BaseReusableComponent> implements IEditor {
  abstract component: any;
  private dynamicComponent: T;

  create(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef, options: EditorOptions): void {
    const componentFactory = componentFactoryResolver.resolveComponentFactory(this.component);
    const dynamicComponent = viewContainerRef.createComponent(componentFactory).instance as T;

    dynamicComponent.fieldName = options.fieldName;
    dynamicComponent.formGroup = options.formGroup;
    dynamicComponent.label = options.label;
    dynamicComponent.validations = options.validations;
    dynamicComponent.srOnly = options.srOnly;
    dynamicComponent.fieldTpl = options.fieldTpl;

    this.dynamicComponent = dynamicComponent;
  }

  configure(callBack: (dynamicComponent: T) => void): Editor<T> {
    callBack(this.dynamicComponent);
    return this;
  }
}
