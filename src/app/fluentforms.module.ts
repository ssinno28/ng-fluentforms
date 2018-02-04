import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BaseFieldComponent} from './components/basefield/basefield.component';
import {HttpClientModule} from '@angular/common/http';
import {BaseFormComponent} from './components/baseform/base.form.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    BaseFieldComponent,
    BaseFormComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FluentFormsModule {
}
