import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {SingleLineTextComponent} from '../../reusable_components/singlelinetext/singlelinetext.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DatePickerComponent} from '../../reusable_components/datepicker/datepicker.component';
import {NumberComponent} from '../../reusable_components/number/number.component';
import {DropdownComponent} from '../../reusable_components/dropdown/dropdown.component';
import {TimePickerComponent} from '../../reusable_components/timepicker/timepicker.component';
import {TestFieldBuilder} from './testfieldbuilder';
import {BaseFormComponent} from '../../../fluentforms';

@Component({
  entryComponents: [
    SingleLineTextComponent,
    DatePickerComponent,
    NumberComponent,
    DropdownComponent,
    TimePickerComponent
  ],
  template: '<form [formGroup]="entityForm" (ngSubmit)="save(entityForm.value, entityForm.valid)" novalidate>' +
  '<ng-template #dynamicInsert></ng-template>' +
  '<button type="submit" class="btn btn-primary btn-round btn-block">Submit</button>' +
  '</form>'
})
export class TestFormComponent extends BaseFormComponent implements OnInit {
  @ViewChild('dynamicInsert', {read: ViewContainerRef}) dynamicInsert: ViewContainerRef;
  entityForm: FormGroup;

  constructor(protected readonly _componentFactoryResolver: ComponentFactoryResolver,
              protected readonly _formBuilder: FormBuilder) {

    super(_componentFactoryResolver, _formBuilder);
    this.entityForm = this._formBuilder.group({});
  }

  save(value: any, valid: boolean): void {
  }

  ngOnInit(): void {
    this.fieldBuilder(TestFieldBuilder)
      .formGroup(this.entityForm)
      .viewContainerRef(this.dynamicInsert);
  }
}
