import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PedidoComponent } from './pedido/pedido.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AdminComponent } from './admin/admin.component';
import { PainelComponent } from './painel/painel.component';
import { FormWizardModule } from 'angular-wizard-form';
import { ArchwizardModule } from 'angular-archwizard';
import { CommonModule } from '@angular/common';

@NgModule({
   declarations: [
      AppComponent,
      PedidoComponent,
      AdminComponent,
      PainelComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule,
      FormsModule,
      BrowserAnimationsModule,
      FormWizardModule,
      ArchwizardModule,
      CommonModule,
      ToastrModule.forRoot()
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
