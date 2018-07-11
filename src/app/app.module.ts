import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { ROUTES } from './app.routes';

import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CatalogComponent } from './catalog/catalog.component';
import { HttpService } from './http.service';
import { CatalogService } from './catalog.service';
import { UserService } from './user.service';


@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent
  ],
  imports: [
    HttpModule,
    RouterModule.forRoot(ROUTES),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    HttpService,
    CatalogService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
