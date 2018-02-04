import {ComponentFactoryResolver, Injector, ViewChild, ViewContainerRef} from '@angular/core';
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';
import {Field} from './models/field.class';

export class BaseFormComponent {
  @ViewChild('fieldsInsert', {read: ViewContainerRef}) fieldsInsert: ViewContainerRef;

  protected entityForm: FormGroup;
  protected fields: Field[] = [];

  wasValidated = false;

  constructor(protected componentFactoryResolver: ComponentFactoryResolver,
              protected _formBuilder: FormBuilder) {

    this.entityForm = _formBuilder.group({});
  }

  field(name: string): Field {
    const field = new Field(this.componentFactoryResolver);
    field.name = name;
    field.fieldViewContainerRef = this.fieldsInsert;
    field.fieldFormGroup = this.entityForm;

    field.eventEmitter.subscribe((value) => {
      if (value.wasValidated) {
        this.wasValidated = true;
      }
    });

    this.fields.push(field);
    return field;
  }
}
