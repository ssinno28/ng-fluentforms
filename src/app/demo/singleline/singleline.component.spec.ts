import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglelineComponent } from './singleline.component';

describe('SinglelineComponent', () => {
  let component: SinglelineComponent;
  let fixture: ComponentFixture<SinglelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
