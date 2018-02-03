import {Field} from '../models/field.class';
import {EventEmitter, ViewContainerRef} from '@angular/core';
import {FormGroup} from '@angular/forms';

export interface IFieldBuilder {
  fields: Field[];
  wasValidated: boolean;
  eventEmitter: EventEmitter<any>;

  field(name: string): Field;
  formGroup(formGroup: FormGroup): IFieldBuilder;
  viewContainerRef(vcr: ViewContainerRef): IFieldBuilder;
}
