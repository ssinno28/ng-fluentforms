import {ComponentFactoryResolver, Injector, ViewChild, ViewContainerRef} from '@angular/core';
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';
import {Field} from './models/field.class';

export class BaseFormComponent {
  @ViewChild('dynamicInsert', {read: ViewContainerRef}) dynamicInsert: ViewContainerRef;

  protected entityForm: FormGroup;
  protected fields: Field[] = [];

  wasValidated = false;

  constructor(protected componentFactoryResolver: ComponentFactoryResolver,
              protected _formBuilder: FormBuilder) {

    this.entityForm = _formBuilder.group({});
  }

  field(name: string): Field {
    const field = new Field();
    field.name = name;
    field.fieldViewContainerRef = this.dynamicInsert;
    field.fieldFormGroup = this.entityForm;
    field.componentFactoryResolver = this.componentFactoryResolver;

    field.eventEmitter.subscribe((value) => {
      if (value.wasValidated) {
        this.wasValidated = true;
      }
    });

    this.fields.push(field);
    return field;
  }

  itemSelected(fg: FormGroup) {
    const selected: boolean = !Boolean(fg.get('selected').value);
    fg.setControl('selected', new FormControl(selected));
  }
}
