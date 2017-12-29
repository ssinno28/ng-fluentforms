import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TestFormComponent} from './testform/testform.component';

const routes: Routes = [
  {
    path: '',
    component: TestFormComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class TestRoutingModule {
}
