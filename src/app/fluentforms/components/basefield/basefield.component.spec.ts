import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Component, DebugElement, EventEmitter} from '@angular/core';
import {BaseFieldComponent} from './basefield.component';
import {Validation} from '../../models/validation.class';
import {By} from '@angular/platform-browser';

@Component({
  selector: 'app-testfield',
  template: `
    <div class="col-xs-12 col-sm-10" [formGroup]="formGroup">
      <label [ngClass]="{'sr-only': srOnly}" [for]="fieldName" class="form-control-label">
        {{label}}
      </label>
      <div class="input-group">
        <input
          class="form-control"
          [formControlName]="fieldName"
          [name]="fieldName"
          [id]="fieldName"
          type="text">
      </div>

      <div *ngFor="let error of errors;" class="invalid-feedback">
        {{error}}
      </div>
    </div>`
})
class TestFieldComponent extends BaseFieldComponent {
}

describe('BaseFieldComponent', () => {
  let component: TestFieldComponent;
  let fixture: ComponentFixture<TestFieldComponent>;
  let inputEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestFieldComponent
      ],
      imports: [
        HttpClientModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFieldComponent);
    component = fixture.componentInstance;
    component.label = 'test label';
    component.fieldName = 'test';
    component.eventEmitter = new EventEmitter<any>();
    component.srOnly = false;
    component.formGroup = TestBed.get(FormBuilder).group({});
    component.formGroup.addControl('test', new FormControl(null));

    inputEl = fixture.debugElement.query(By.css('.form-control'));
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call onInit', () => {
    spyOn(component, 'onInit');
    fixture.detectChanges();

    expect(component.onInit).toHaveBeenCalled();
  });

  it('should show error', async () => {
    const validation = new Validation();
    validation.validator = Validators.required;
    validation.message = 'The test field is required!!';
    component.validations = [validation];

    const control = component.formGroup.get('test');
    control.setValidators(validation.validator);

    fixture.detectChanges();
    await fixture.whenStable()
      .then(() => {
        spyOn(component.eventEmitter, 'emit');

        inputEl.nativeElement.value = 'testing!';
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(control.dirty).toBeTruthy();

        inputEl.nativeElement.value = '';
        inputEl.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(component.eventEmitter.emit).toHaveBeenCalled();
        expect(component.errors.length).toBeGreaterThan(0);
      });
  });
});
