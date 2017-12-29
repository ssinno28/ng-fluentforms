import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SingleLineTextComponent} from './reusable_components/singlelinetext/singlelinetext.component';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SingleLineTextComponent
  ],
  entryComponents: [
    SingleLineTextComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EntityViewModule {
}
