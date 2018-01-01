import {ComponentFactoryResolver, ViewContainerRef} from '@angular/core';

export class Editor {

  createComponent(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef, component: any) {
    const componentFactory = componentFactoryResolver.resolveComponentFactory(component);
    const dynamicComponent = viewContainerRef.createComponent(componentFactory).instance;

    return dynamicComponent;
  }
}
