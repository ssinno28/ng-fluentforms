import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestFormComponent} from './testform.component';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {TestRoutingModule} from '../routing';
import {SingleLineTextComponent} from '../../reusable_components/singlelinetext/singlelinetext.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {DatePickerComponent} from '../../reusable_components/datepicker/datepicker.component';

describe('TestFormComponent', () => {
  let component: TestFormComponent;
  let fixture: ComponentFixture<TestFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestFormComponent, SingleLineTextComponent, DatePickerComponent],
      imports: [
        HttpClientModule,
        CommonModule,
        TestRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot()
      ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFormComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
