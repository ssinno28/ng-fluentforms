import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {BaseFormComponent} from '../../base.form.component';
import {SingleLineTextComponent} from '../../reusable_components/singlelinetext/singlelinetext.component';
import {FormBuilder} from '@angular/forms';
import {SingleLineEditor} from '../../editors/singleline.editor';

@Component({
  entryComponents: [
    SingleLineTextComponent
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
      .editor(SingleLineEditor, {placeholderTxt: 'Title'});
  }
}
