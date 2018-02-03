import {ComponentFactoryResolver, ViewContainerRef} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Field} from '../../models/field.class';
import {IFieldBuilder} from '../../fieldbuilder/ifieldbuilder';

export class BaseFormComponent {
  protected fields: Field[] = [];
  protected wasValidated = false;

  constructor(protected readonly componentFactoryResolver: ComponentFactoryResolver,
              protected readonly _formBuilder: FormBuilder) {
  }

  fieldBuilder<T extends IFieldBuilder>(fieldBuilderType: new (cfr: ComponentFactoryResolver, fb: FormBuilder) => T): T {
    const fieldBuilder = new fieldBuilderType(this.componentFactoryResolver, this._formBuilder);
    this.fields.concat(fieldBuilder.fields);

    fieldBuilder.eventEmitter.subscribe((value) => {
      if (value.wasValidated) {
        this.wasValidated = true;
      }
    });

    return fieldBuilder;
  }
}
