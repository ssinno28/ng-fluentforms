import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {EntityViewModule} from './entityview/entityview.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    EntityViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
