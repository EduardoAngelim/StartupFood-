import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ArchwizardModule } from 'angular-archwizard';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
   declarations: [
      AppComponent,
      MainComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      ArchwizardModule,
      ReactiveFormsModule,
      FormsModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot()
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
