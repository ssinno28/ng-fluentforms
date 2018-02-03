import {FieldBuilder} from '../../../fluentforms';
import {FormBuilder} from '@angular/forms';
import {ComponentFactoryResolver} from '@angular/core';
import {SingleLineEditor} from '../../editors/singleline.editor';
import {NumberEditor} from '../../editors/number.editor';
import {DropdownEditor} from '../../editors/dropdown.editor';
import {DatePickerEditor} from '../../editors/datepicker.editor';
import {TimePickerEditor} from '../../editors/timepicker.editor';

export class TestFieldBuilder extends FieldBuilder {
  constructor(protected readonly _componentFactoryResolver: ComponentFactoryResolver,
              protected readonly _formBuilder: FormBuilder) {

    super(_componentFactoryResolver, _formBuilder);
  }

  protected buildFields() {
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
