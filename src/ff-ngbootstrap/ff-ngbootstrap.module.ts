///<reference path="reusable_components/dropdown/dropdown.component.ts"/>
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {TimePickerComponent} from './reusable_components/timepicker/timepicker.component';
import {DropdownComponent} from './reusable_components/dropdown/dropdown.component';
import {NumberComponent} from './reusable_components/number/number.component';
import {DatePickerComponent} from './reusable_components/datepicker/datepicker.component';
import {SingleLineTextComponent} from './reusable_components/singlelinetext/singlelinetext.component';
import {FluentFormsModule} from '../fluentforms/fluentforms.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FluentFormsModule
  ],
  declarations: [
    SingleLineTextComponent,
    DatePickerComponent,
    NumberComponent,
    DropdownComponent,
    TimePickerComponent
  ],
  entryComponents: [
    SingleLineTextComponent,
    DatePickerComponent,
    NumberComponent,
    DropdownComponent,
    TimePickerComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FfNgbootstrapModule {
}
