import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {BaseFormComponent} from '../../base.form.component';
import {SingleLineTextComponent} from '../../reusable_components/singlelinetext/singlelinetext.component';
import {FormBuilder} from '@angular/forms';
import {SingleLineEditor} from '../../editors/singleline.editor';
import {SingleLineOptions} from '../../options/singlelineoptions.class';
import {DatePickerEditor} from '../../editors/datepicker.editor';
import {DatePickerOptions} from '../../options/datepickeroptions.class';
import {DatePickerComponent} from '../../reusable_components/datepicker/datepicker.component';

@Component({
  entryComponents: [
    SingleLineTextComponent,
    DatePickerComponent
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
  }
}
