import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {APP_BASE_HREF, CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {By} from '@angular/platform-browser';
import {BaseFormComponent} from './base.form.component';
import {Editor} from '../../editors/base.editor';
import {BaseFieldComponent} from '../basefield/basefield.component';
import {SinglelineEditor} from '../../../demo/editors/SinglelineEditor';

class TestEditor extends Editor<TestFieldComponent> {
  component = TestFieldComponent;
}

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

@Component({
  selector: 'app-testformgroup',
  template: `
    <ng-template #fieldsInsert></ng-template>`,
  entryComponents: [
    TestFieldComponent
  ]
})
class TestFormGroupComponent extends BaseFormComponent implements OnInit {
  constructor(protected componentFactoryResolver: ComponentFactoryResolver,
              _formBuilder: FormBuilder) {

    super(componentFactoryResolver, _formBuilder);
  }

  onInit(): void {
    this.field('firstName')
      .required('The first Name is required!')
      .label('First Name')
      .editor(TestEditor);

    this.field('lastName')
      .required('The last name is required!')
      .label('Last Name')
      .editor(TestEditor);
  }
}

@Component({
  selector: 'app-testformgroup2',
  template: `
    <ng-template #fieldsInsert></ng-template>`,
  entryComponents: [
    TestFieldComponent
  ]
})
class TestFormGroup2Component extends BaseFormComponent implements OnInit {
  constructor(protected componentFactoryResolver: ComponentFactoryResolver,
              _formBuilder: FormBuilder) {

    super(componentFactoryResolver, _formBuilder);
  }

  onInit(): void {
    this.field('address')
      .required('The address is required!')
      .label('Address')
      .editor(TestEditor);

    this.field('city')
      .required('The city is required!')
      .label('City')
      .editor(TestEditor);
  }
}

@Component({
  selector: 'app-testform',
  template: `
    <form [formGroup]="formGroup" (ngSubmit)="save(formGroup.value, formGroup.valid)">
      <app-testformgroup [parentForm]="formGroup"></app-testformgroup>
      <app-testformgroup2 [parentForm]="formGroup"></app-testformgroup2>
    </form>`
})
class TestFormComponent {
  @ViewChild(TestFormGroupComponent) formGroupComp: TestFormGroupComponent;
  @ViewChild(TestFormGroup2Component) formGroupComp2: TestFormGroup2Component;

  formGroup: FormGroup;

  constructor(_formBuilder: FormBuilder) {
    this.formGroup = _formBuilder.group({});
  }

  save(value: any, valid: boolean): void {
  }
}

describe('BaseFormComponent', () => {
  let component: TestFormComponent;
  let formGroupComp: TestFormGroupComponent;
  let formGroup2Comp: TestFormGroup2Component;

  let fixture: ComponentFixture<TestFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestFormComponent,
        TestFormGroup2Component,
        TestFormGroupComponent,
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
    fixture = TestBed.createComponent(TestFormComponent);
    component = fixture.componentInstance;

    formGroupComp = component.formGroupComp;
    formGroup2Comp = component.formGroupComp2;
  });

  it('should be created',
    () => {
      expect(component).toBeTruthy();
      expect(formGroupComp).toBeTruthy();
      expect(formGroup2Comp).toBeTruthy();
    });

  it('should properly set form groups in sub-components',
    () => {
      fixture.detectChanges();

      expect(formGroup2Comp.entityForm).toBeTruthy();
      expect(formGroupComp.entityForm).toBeTruthy();
    });

  it('should properly set form groups parents in sub-components',
    () => {
      fixture.detectChanges();

      expect(formGroup2Comp.entityForm.parent).toBeTruthy();
      expect(formGroupComp.entityForm.parent).toBeTruthy();
    });

  it('should call onInit', () => {
    spyOn(formGroup2Comp, 'onInit');
    spyOn(formGroupComp, 'onInit');
    fixture.detectChanges();

    expect(formGroup2Comp.onInit).toHaveBeenCalled();
    expect(formGroupComp.onInit).toHaveBeenCalled();
  });

  it('should update wasValidated',
    async () => {
      fixture.detectChanges();
      await fixture.whenStable()
        .then(() => {
          const control = formGroup2Comp.entityForm.get('address');

          const addressEl = fixture.debugElement.query(By.css('input[name=address]'));
          addressEl.nativeElement.value = 'testing!';
          addressEl.nativeElement.dispatchEvent(new Event('input'));
          fixture.detectChanges();

          expect(control.dirty).toBeTruthy();

          addressEl.nativeElement.value = '';
          addressEl.nativeElement.dispatchEvent(new Event('input'));
          fixture.detectChanges();

          expect(formGroup2Comp.wasValidated).toBeTruthy();
        });
    });

  it('should allow no validations for fields',
    async () => {
      fixture.detectChanges();
      await fixture.whenStable()
        .then(() => {
          const field =
            formGroupComp.field('middleName')
              .label('Middle Name')
              .editor(TestEditor);

          fixture.detectChanges();
          expect(field).toBeTruthy();
        });
    });

  it('should get right index',
    async () => {
      fixture.detectChanges();
      await fixture.whenStable()
        .then(() => {
          const editor =
            formGroupComp.field('middleName')
              .label('Middle Name')
              .editor(TestEditor);

          expect(editor.index).toEqual(2);
        });
    });

  it('gets already created field instead of creating a new one', async () => {
    fixture.detectChanges();
    await fixture.whenStable()
      .then(() => {
        const field = formGroupComp.field('firstName');

        expect(formGroupComp.fields.length).toEqual(2);
      });
  });

/*  it('does not create a new editor', async () => {
    fixture.detectChanges();
    await fixture.whenStable()
      .then(() => {
        const field =
          formGroupComp.field('firstName');
        spyOn(field, 'addEditor');

        field.editor(TestEditor);

        expect(field.addEditor).not.toHaveBeenCalled();
      });
  });*/
});
