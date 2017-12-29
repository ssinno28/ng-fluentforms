import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TestFormComponent} from './testform.component';
import {HttpModule} from '@angular/http';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TestRoutingModule} from '../routing';

describe('TestFormComponent', () => {
  let component: TestFormComponent;
  let fixture: ComponentFixture<TestFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestFormComponent],
      imports: [HttpModule, CommonModule, RouterModule, TestRoutingModule],
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
