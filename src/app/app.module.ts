import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { DisplayComponent } from './components/display/display.component';
import { DeliveryDateComponent } from './components/delivery-date/delivery-date.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsPageComponent } from './pages/forms-page/forms-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DisplayPageComponent } from './pages/display-page/display-page.component';
import { DateTimePipe } from './pipes/date-time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DeliveryComponent,
    DisplayComponent,
    DeliveryDateComponent,
    HomeComponent,
    FormsPageComponent,
    DisplayPageComponent,
    DateTimePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
