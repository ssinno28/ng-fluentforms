import {ComponentFactoryResolver, ViewContainerRef} from '@angular/core';

export interface IEditor {
  add(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef, options: any, index?: number): void;
}
