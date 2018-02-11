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
  template: `<ng-template #fieldsInsert></ng-template>`,
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

## BaseFieldComponent

Here I've set up a component called SinglelineComponent that extends BaseFieldComponent. In order to understand what the BaseFieldComponent offers
it is a good idea to look at the [implementation](https://github.com/ssinno28/ng-fluentforms/blob/master/src/app/fluentforms/components/basefield/basefield.component.ts) as it is pretty simple.

## Editor

Next is the SinglelineEditor, this extends Editor base class and basically operates as the liaison between the form component and our input component. So why do we need an intermediary between
the form and the component? Well for two reasons, first off dynamically creating and removing components is not simple, the base editor class contains references 
to the ComponentRef, ViewContainerRef and the actual component itself. By having the editor class manage these types we can easily move, remove and create components as needed.

In order to get an idea of what is available from the base editor class, you'll need to take a look at the actual 
[implementation](https://github.com/ssinno28/ng-fluentforms/blob/master/src/app/fluentforms/editors/base.editor.ts).

Secondly, the framework is setup to allow developers to extend their own Editor class (in this case SinglelineEditor) and chain in more methods after setting up the field.

Here is an example:

```typescript
export class SinglelineEditor extends Editor<SinglelineComponent> {
  component = SinglelineComponent;
  
  setValue(value: string): Editor<T> {
    this.dynamicComponent.value = value;
    return this;
  }
}

    this.field('firstName')
      .required('The first Name is required!')
      .label('First Name')
      .editor(SinglelineEditor)
      .setValue('This is cool!!');
```

The neat thing about this implementation is that Typescript can pick up the editor class definition and provide intelisense for the methods on your editor. One other thing to mention is that 
in most cases you will want to return `this` so you can chain more methods after that. 

Since you have access to the component through your editor class, that is where you could pass data from service calls with custom methods, but if you 
don't feel like setting up any custom methods you can just call the `configure` method off of the base class:

```typescript
  configure(callBack: (dynamicComponent: T) => void): Editor<T> {
    callBack(this.dynamicComponent);
    return this;
  }
```

The configure method takes a delegate that will pass in your dynamic component so you can configure anything you want with your component.

## BaseFormComponent

Lastly, is the actual form itself. The BaseFormComponent has a method called field on it where basically all the magic begins. It instantiates a new field, passes in the necessary default
values and then you are off and running!

A couple of things worth mentioning here is that you will want to call onInit instead of ngOnInit since the BaseFormComponent utilizes ngOnInit. Also, by default the BaseFormComponent
looks for a template reference called #fieldsInsert `<ng-template #fieldsInsert></ng-template>`.

If you would like, you can also set up multiple form components and embed them in a parent form like so:

```angular2html
<form>
<app-demoform [parentForm]="parentForm"></app-demoform>
<app-demoform2 [parentForm]="parentForm"></app-demoform>
</form>
```

Each demo form will have its own form group, but the parent of their form groups will be set to parentForm.

## Field

The part of the framework that handles most of the complexity is the `Field` class. This is what the field method off of the BaseFormComponent returns and 
manages the state of the form control by passing in validation as well as giving you the ability to override the defaults that are set for the fields
FormGroup and ViewContainerRef.

Here are a set of methods off of the `Field` class:

`label(label: string, srOnly: boolean = false): Field`  
The label method just allows you to supply label text and whether or not it is screen reader only.

`formGroup(formGroup: FormGroup): Field`  
By default you don't need to call this method as it will be set to the BaseFormComponents FormGroup, but if you would like to supply your own
you can here.

`viewContainerRef(viewContainerRef: ViewContainerRef): Field`  
By default you don't need to call this method, but if you would like to place this field in a separate view container than #fieldsInsert, you can here.

`editor<T extends IEditor>(editorType: new () => T, index?: number): T`  
The editor method you can only call after you have set up your field the way you want it. That is because after calling the editor method
you will be chaining editor methods instead of field methods. As you can see there is also an optional parameter here for an index specifying 
where you want to place the component.

`validator(message: string, validator: (control: AbstractControl) => { [s: string]: boolean }): Field`  
Using this method you can pass in your own custom validator delegate.

`asyncValidator(message: string, validator: (control: AbstractControl) => Promise<ValidationErrors | null>): Field`  
This method allows you to pass in your own async validator delegate.

Here are a set of default validators you can chain into the field:

`required(message: string): Field`  
`min(message: string, min: number): Field`  
`max(message: string, max: number): Field`  
`numeric(message: string): Field`  
`alphanum(message: string): Field`  
`alpha(message: string): Field`  
`email(message: string): Field`  


