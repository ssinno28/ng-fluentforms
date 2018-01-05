import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {BaseFormComponent} from '../../base.form.component';
import {SingleLineTextComponent} from '../../reusable_components/singlelinetext/singlelinetext.component';
import {FormBuilder} from '@angular/forms';
import {DatePickerComponent} from '../../reusable_components/datepicker/datepicker.component';
import {DatePickerOptions} from '../../models/options/datepickeroptions.class';
import {DatePickerEditor} from '../../models/editors/datepicker.editor';
import {SingleLineEditor} from '../../models/editors/singleline.editor';
import {SingleLineOptions} from '../../models/options/singlelineoptions.class';
import {NumberEditor} from '../../models/editors/number.editor';
import {NumberOptions} from '../../models/options/numberoptions.class';
import {NumberComponent} from '../../reusable_components/number/number.component';
import {DropdownComponent} from '../../reusable_components/dropdown/dropdown.component';
import {DropdownEditor} from '../../models/editors/dropdown.editor';
import {DropdownOptions} from '../../models/options/dropdownoptions.class';

@Component({
  entryComponents: [
    SingleLineTextComponent,
    DatePickerComponent,
    NumberComponent,
    DropdownComponent
  ],
  template: '<form [formGroup]="entityForm" (ngSubmit)="save(entityForm.value, entityForm.valid)">' +
  '<ng-template #dynamicInsert></ng-template>' +
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
      .editor(SingleLineEditor, <SingleLineOptions>({
        placeholderTxt: 'Title'
      }));

    this.field('dob')
      .label('Date of Birth')
      .required('The date of birth is required!')
      .editor(DatePickerEditor, <DatePickerOptions>({
        displayMonths: 1
      }));

    this.field('age')
      .label('Age')
      .required('Your age is required!')
      .editor(NumberEditor, <NumberOptions>({
        precision: 2,
        nonNegative: true
      }));

    this.field('siblings')
      .label('Siblings')
      .editor(DropdownEditor, <DropdownOptions>({
        placement: '',
        selectItems: [
          {
            text: 'test',
            value: 0,
            selected: false
          },
          {
            text: 'test 2',
            value: 1,
            selected: true
          }]
      }));
  }
}
