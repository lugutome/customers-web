import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout/layout.component';
import { CustomMaterialModule } from './shared/material/custom-material.module';
import { MainComponent } from './modules/main/main.component';
import { CustomerComponent } from './modules/customer/customer.component';
import { IndicatorsComponent } from './modules/indicators/indicators.component';
import { CustomerService } from './services/customer.service';
import { HttpClientModule } from '@angular/common/http';
import { AlertService } from './services/alert.service';
import { FormsModule } from '@angular/forms';
import { CustomerNewComponent } from './modules/customer/customer-new.component';

@NgModule({
  declarations: [
    LayoutComponent,
    AppComponent,
    MainComponent,
    CustomerComponent,
    CustomerNewComponent,
    IndicatorsComponent
  ],
  imports: [    
    FormsModule,
    HttpClientModule,  
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomMaterialModule
  ],
  exports: [
    CustomMaterialModule
  ],
  providers: [
    AlertService,
    CustomerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
