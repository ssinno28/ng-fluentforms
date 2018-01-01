import {ComponentFactoryResolver, ViewContainerRef} from '@angular/core';

export interface IEditor {
  create(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef, options: any): void;
}
