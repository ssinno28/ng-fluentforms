import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DemoFormComponent} from './demoform/demoform.component';
import {SinglelineComponent} from './singleline/singleline.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FluentFormsModule} from '../';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FluentFormsModule
  ],
  exports: [DemoFormComponent, SinglelineComponent],
  declarations: [DemoFormComponent, SinglelineComponent],
  entryComponents: [SinglelineComponent]
})
export class DemoModule {
}
