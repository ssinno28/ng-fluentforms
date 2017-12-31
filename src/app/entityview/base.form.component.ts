﻿import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {BaseService} from './base.service';
import {Entity} from './entity.interface';
import {Field} from './models/field.class';

declare var $: any;

export class BaseFormComponent<T extends Entity> implements OnInit {
  @ViewChild('dynamicInsert', { read: ViewContainerRef }) dynamicInsert: ViewContainerRef;

  public submitted: boolean;
  public events: any[] = [];
  public id: any = null;
  public item: T;
  public entityForm: FormGroup;
  public fields: Field[];

  constructor(public service: BaseService<T>,
              public route: ActivatedRoute,
              public componentFactoryResolver: ComponentFactoryResolver,
              private _formBuilder: FormBuilder) {

    this.id = route.snapshot.params['id'];
    this.fields = new Array<Field>();
    this.entityForm = _formBuilder.group({});
  }

  onInit(): void {
  }

  onCreated(): void {
  }

  onPatch(item: T): void {
  }

  field(name: string): Field {
    const field = new Field(this.dynamicInsert, this.componentFactoryResolver, this.entityForm);
    field.name = name;

    this.fields.push(field);
    return field;
  }

  ngOnInit(): void {
    this.onInit();

    if (this.id != null) {
      this.service.get(this.id)
        .then(result => {
          this.item = result;

          this.entityForm.patchValue(result);
          this.onPatch(result);
        });
    }
  }

  save(model: T, isValid: boolean) {
    this.submitted = true; // set form submit to true

    // check if model is valid
    // if valid, call API to save customer
    if (isValid) {
      if (this.id == null) {
        this.service.create(model)
          .then(result => {
            this.id = result;

            if (this.id !== null && this.id !== 0) {
              this.showNotification('Item successfully created!', 'success');
              this.onCreated();
            } else {
              this.showNotification('Could not create item!', 'warning');
            }
          });
      } else {
        model.id = parseInt(this.id);
        this.service.update(model)
          .then(result => {
            const success = result;
            if (success) {
              this.showNotification('Item successfully updated!', 'success');
            } else {
              this.showNotification('Could not update item!', 'warning');
            }
          });
      }
    }
  }

  showNotification(message: string, type: string): void {
    $.notify({
      icon: 'add_alert',
      message: message

    }, {
      type: type,
      timer: 4000,
      placement: {
        from: 'top',
        align: 'right'
      }
    });
  }

  itemSelected(fg: FormGroup) {
    const selected: boolean = !Boolean(fg.get('selected').value);
    fg.setControl('selected', new FormControl(selected));
  }
}
