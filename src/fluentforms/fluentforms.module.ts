import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SingleLineTextComponent} from './reusable_components/singlelinetext/singlelinetext.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BaseReusableComponent} from './reusable_components/basereusable/basereusable.component';
import {HttpClientModule} from '@angular/common/http';
import {DatePickerComponent} from './reusable_components/datepicker/datepicker.component';
import {NumberComponent} from './reusable_components/number/number.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    SingleLineTextComponent,
    BaseReusableComponent,
    DatePickerComponent,
    NumberComponent
  ],
  entryComponents: [
    SingleLineTextComponent,
    DatePickerComponent,
    NumberComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FluentFormsModule {
}
