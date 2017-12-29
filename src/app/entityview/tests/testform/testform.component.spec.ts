import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestFormComponent} from './testform.component';
import {HttpModule} from '@angular/http';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TestRoutingModule} from '../routing';
import {SingleLineTextComponent} from '../../reusable_components/singlelinetext/singlelinetext.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('TestFormComponent', () => {
  let component: TestFormComponent;
  let fixture: ComponentFixture<TestFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestFormComponent, SingleLineTextComponent],
      imports: [HttpModule, CommonModule, RouterModule, TestRoutingModule, FormsModule, ReactiveFormsModule],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
