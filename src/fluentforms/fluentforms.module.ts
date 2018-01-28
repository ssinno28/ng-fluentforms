import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BaseReusableComponent} from './reusable_components/basereusable/basereusable.component';
import {HttpClientModule} from '@angular/common/http';
import {BaseFormComponent} from './base.form.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    BaseReusableComponent,
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
