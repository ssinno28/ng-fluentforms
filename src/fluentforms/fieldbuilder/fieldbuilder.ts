import {IFieldBuilder} from './ifieldbuilder';
import {Field} from '../models/field.class';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ComponentFactoryResolver, EventEmitter, ViewContainerRef} from '@angular/core';

export abstract class FieldBuilder implements IFieldBuilder {
  public fields: Field[] = [];
  public wasValidated = false;
  public eventEmitter = new EventEmitter<any>();

  private _fieldViewContainerRef: ViewContainerRef;
  private _fieldFormGroup: FormGroup;

  constructor(protected readonly _componentFactoryResolver: ComponentFactoryResolver,
              protected readonly _formBuilder: FormBuilder) {
  }

  protected abstract buildFields();

  public viewContainerRef(vcr: ViewContainerRef): IFieldBuilder {
    this._fieldViewContainerRef = vcr;
    this.buildFields();
    return this;
  }

  public formGroup(formGroup: FormGroup): IFieldBuilder {
    this._fieldFormGroup = formGroup;
    return this;
  }

  public field(name: string): Field {
    const field = new Field(this._componentFactoryResolver);
    field.name = name;
    field.fieldViewContainerRef = this._fieldViewContainerRef;
    field.fieldFormGroup = this._fieldFormGroup;

    field.eventEmitter.subscribe((value) => {
      if (value.wasValidated) {
        this.wasValidated = true;
        this.eventEmitter.emit({wasValidated: true});
      }
    });

    this.fields.push(field);
    return field;
  }
}
