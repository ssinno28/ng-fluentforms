import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import * as _ from 'lodash';
import {Field} from '../models/field.class';
import {Validations} from '../models/validations.class';

export class Fields {
  public entityForm: FormGroup;

  field(name: string): void {
    let returnObj: Field;
    returnObj.validations = new Validations();
  }
}
