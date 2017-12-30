import {Component, ComponentFactoryResolver, OnInit, ViewContainerRef} from '@angular/core';
import {BaseFormComponent} from '../../base.form.component';
import {Test} from '../test.interface';
import {TestService} from '../test.service';
import {ActivatedRoute} from '@angular/router';
import {SingleLineTextComponent} from '../../reusable_components/singlelinetext/singlelinetext.component';
import {FormBuilder} from '@angular/forms';

@Component({
  providers: [TestService],
  entryComponents: [
    SingleLineTextComponent
  ],
  template: '<form [formGroup]="entityForm" (ngSubmit)="save(entityForm.value, entityForm.valid)">' +
  '<ng-template #dynamicInsert></ng-template>' +
  '<button type="submit" class="btn btn-primary btn-round btn-block">Submit</button>' +
  '</form>'
})
export class TestFormComponent extends BaseFormComponent<Test> {

  constructor(public service: TestService,
              public route: ActivatedRoute,
              public componentFactoryResolver: ComponentFactoryResolver,
              _formBuilder: FormBuilder) {

    super(service, route, componentFactoryResolver, _formBuilder);
  }

  onInit() {
    this.field('title')
      .required('The title is required!')
      .min('Title has to be at least 50 characters!', 50)
      .singleline('Title');

    this.field('name')
      .required('The name is required!')
      .singleline('Name');
  }
}
