import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SingleLineTextComponent} from './reusable_components/singlelinetext/singlelinetext.component';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule
  ],
  declarations: [
    SingleLineTextComponent
  ]
})
export class EntityViewModule {
}
