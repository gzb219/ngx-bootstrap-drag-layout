import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DragComponent} from './drag/drag.component';
import {HttpModule} from '@angular/http';
// Imports for loading & configuring the in-memory web api
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './service/in-memory-data.service';
import {Drag1Component} from './drag1/drag1.component';
import {Drag2Component} from './drag2/drag2.component';
import {Drag3Component} from './drag3/drag3.component';
import {Drag4Component} from './drag4/drag4.component';
import {Drag5Component} from './drag5/drag5.component';
import {Drag6Component} from './drag6/drag6.component';
import {Drag7Component} from './drag7/drag7.component';
import {Drag8Component} from './drag8/drag8.component';
import {Drag9Component} from './drag9/drag9.component';

@NgModule({
  declarations: [
    AppComponent,
    DragComponent,
    Drag1Component,
    Drag2Component,
    Drag3Component,
    Drag4Component,
    Drag5Component,
    Drag6Component,
    Drag7Component,
    Drag8Component,
    Drag9Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
