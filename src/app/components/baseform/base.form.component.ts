﻿import {ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {Field} from '../../models/field.class';

export abstract class BaseFormComponent implements OnInit {
  @ViewChild('fieldsInsert', {read: ViewContainerRef}) fieldsInsert: ViewContainerRef;

  @Input()
  parentForm: FormGroup;
  entityForm: FormGroup;

  wasValidated = false;
  fields: Field[] = [];

  constructor(protected componentFactoryResolver: ComponentFactoryResolver,
              protected _formBuilder: FormBuilder) {
  }

  protected abstract onInit();

  ngOnInit(): void {
    this.entityForm = this._formBuilder.group({});

    if (this.parentForm !== undefined) {
      this.entityForm.setParent(this.parentForm);
    }

    this.onInit();
  }

  field(name: string, value?: string): Field {
    const field = new Field(this.componentFactoryResolver, this.fieldsInsert, this.entityForm, value);
    field.name = name;

    field.eventEmitter.subscribe((fieldValue) => {
      if (fieldValue.wasValidated) {
        this.wasValidated = true;
      }
    });

    this.fields.push(field);
    return field;
  }
}
