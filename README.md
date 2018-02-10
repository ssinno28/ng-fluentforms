# ng-fluentforms

ng-fluentforms is a lightweight framework built to support creating reusable form inputs. This library does not come with any components out of the box, instead
it is meant to help with creating customizable form components of your own.

So why fluent syntax? I decided to go with this for two reasons, first off it is just easier to read than manual configuration of objects. Secondly it 
allows me to do what one of the main goals of this framework was, that is to create these components dynamically instead of using template syntax.

Lets take a look at a quick example:

```typescript
import { Component, OnInit } from '@angular/core';
import {BaseFieldComponent} from '../../fluentforms/components/basefield/basefield.component';

@Component({
  selector: 'app-singleline',
  template: `<div [formGroup]="formGroup">
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
                </div>`,
  styleUrls: ['./singleline.component.css']
})
export class SinglelineComponent extends BaseFieldComponent {

}

import {SinglelineComponent} from '../singleline/singleline.component';
import {Editor} from '../../fluentforms/editors/base.editor';

export class SinglelineEditor extends Editor<SinglelineComponent> {
  component = SinglelineComponent;
}

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
```

Here I've set up a component called SinglelineComponent that extends BaseFieldComponent. With BaseFieldComponent comes a set of default properties 
that can be used in the component template:

```typescript
  fieldName: string;
  formGroup: FormGroup;
  validations: Validation[];
  label: string;
  srOnly: boolean;
  errors: string[] = [];
  eventEmitter: EventEmitter<any>;
  disabled = false;
```

and here is my template (using bootstrap here):

```angular2html
<div [formGroup]="formGroup">
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
</div>
```

Next is the SinglelineEditor, this extends Editor base class and basically operates as the liaison between the form component and our input component. So why do we need an intermediary between
the form and the component? Well for two reasons, first off dynamically creating and removing components is not simple, the base editor class contains references 
to the ComponentRef, ViewContainerRef and the actual component itself. By having the editor class manage these types we can easily move, remove and create components as needed.
Secondly, the framework is setup to allow developers to extend the their own Editor class (in this case SinglelineEditor) and chain in more methods after setting up the field.

Here is an example:

```typescript
export class SinglelineEditor extends Editor<SinglelineComponent> {
  component = SinglelineComponent;
  
  setValue(value: string){
    this.dynamicComponent.value = value;
  }
}

    this.field('firstName')
      .required('The first Name is required!')
      .label('First Name')
      .editor(SinglelineEditor)
      .setValue('This is cool!!');
```

The neat thing about this implementation is that Typescript can pick up the editor class definition and provide intelisense for the methods on your editor. 

Lastly, is the actual form itself. The BaseFormComponent has a method called field on it which basically where all the magic begins. It instantiates a new field, passes in the necessary default
values and then you are off and running!

One thing worth mentioning here is that you will want to call onInit instead of ngOnInit since the BaseFormComponent utilizes ngOnInit. 

If you would like, you can also set up multiple form components and embed them in a parent form like so:

```angular2html
<form>
<app-demoform [parentForm]="parentForm"></app-demoform>
<app-demoform2 [parentForm]="parentForm"></app-demoform>
</form>
```

Each demo form will have its own form group, but the parent of their form groups will be set to parentForm.

