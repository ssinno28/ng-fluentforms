import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SingleLineTextComponent} from './reusable_components/singlelinetext/singlelinetext.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SingleLineTextComponent
  ]
})
export class EntityViewModule {
}
