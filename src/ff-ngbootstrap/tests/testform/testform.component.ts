import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {SingleLineTextComponent} from '../../reusable_components/singlelinetext/singlelinetext.component';
import {FormBuilder} from '@angular/forms';
import {DatePickerComponent} from '../../reusable_components/datepicker/datepicker.component';
import {SingleLineEditor} from '../../editors/singleline.editor';
import {NumberComponent} from '../../reusable_components/number/number.component';
import {DropdownComponent} from '../../reusable_components/dropdown/dropdown.component';
import {DatePickerEditor} from '../../editors/datepicker.editor';
import {NumberEditor} from '../../editors/number.editor';
import {DropdownEditor} from '../../editors/dropdown.editor';
import {TimePickerEditor} from '../../editors/timepicker.editor';
import {TimePickerComponent} from '../../reusable_components/timepicker/timepicker.component';
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
  '<ng-template #fieldsInsert></ng-template>' +
  '<button type="submit" class="btn btn-primary btn-round btn-block">Submit</button>' +
  '</form>'
})
export class TestFormComponent extends BaseFormComponent implements OnInit {
  constructor(protected componentFactoryResolver: ComponentFactoryResolver,
              _formBuilder: FormBuilder) {

    super(componentFactoryResolver, _formBuilder);
  }

  save(value: any, valid: boolean): void {
  }

  ngOnInit(): void {
    this.field('title')
      .label('Title')
      .required('The title is required!')
      .editor(SingleLineEditor)
      .configure((component) => {
        component.placeholderTxt = 'Title';
      });

    this.field('dob')
      .label('Date of Birth')
      .required('The date of birth is required!')
      .editor(DatePickerEditor)
      .configure((component) => {
        component.displayMonths = 1;
      });

    this.field('tob')
      .label('Time of Birth')
      .required('The time of birth is required!')
      .editor(TimePickerEditor);

    this.field('age')
      .label('Age')
      .required('Your age is required!')
      .editor(NumberEditor)
      .configure((component) => {
        component.precision = 2;
        component.nonNegative = true;
      });

    this.field('siblings')
      .label('Siblings')
      .editor(DropdownEditor)
      .configure((component) => {
        component.selectItems = [
          {
            text: 'test',
            value: 0,
            selected: false
          },
          {
            text: 'test 2',
            value: 1,
            selected: true
          }];
      });
  }
}
