import {Component, ComponentFactoryResolver, OnInit, ViewContainerRef} from '@angular/core';
import {BaseFormComponent} from '../../base.form.component';
import {Test} from '../test.interface';
import {TestService} from '../test.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-testform',
  templateUrl: './testform.component.html',
  styleUrls: ['./testform.component.css']
})
export class TestFormComponent extends BaseFormComponent<Test> {

  constructor(public service: TestService,
              public route: ActivatedRoute,
              public componentFactoryResolver: ComponentFactoryResolver,
              public viewContainerRef: ViewContainerRef) {
    super(service, route, componentFactoryResolver, viewContainerRef);
  }

  onInit() {
    this.field('title')
      .required('The title is required!')
      .singleline('Title');
  }
}
