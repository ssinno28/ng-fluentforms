import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {BaseFormComponent} from '../../fluentforms/components/baseform/base.form.component';
import {FormBuilder} from '@angular/forms';
import {SinglelineEditor} from '../editors/SinglelineEditor';

@Component({
  selector: 'app-demoform',
  templateUrl: './demoform.component.html',
  styleUrls: ['./demoform.component.css']
})
export class DemoFormComponent extends BaseFormComponent {

  constructor(protected componentFactoryResolver: ComponentFactoryResolver,
              _formBuilder: FormBuilder) {

    super(componentFactoryResolver, _formBuilder);
  }

  onInit() {
    this.field('firstName')
      .required('The first Name is required!')
      .label('First Name')
      .editor(SinglelineEditor);

    this.field('lastName')
      .required('The last name is required!')
      .label('Last Name')
      .editor(SinglelineEditor, 0);
  }
}
