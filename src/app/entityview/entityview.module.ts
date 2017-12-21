import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SingleLineTextComponent} from './reusable_components/singlelinetext/singlelinetext.component';
import { TestformComponent } from './tests/src/app/entityview/tests/entityview/tests/testform/testform.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SingleLineTextComponent,
    TestformComponent
  ]
})
export class EntityViewModule {
}
