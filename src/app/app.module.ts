import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './pages/start/start.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CheckBoxComponent } from './shared/components/check-box/check-box.component';
import { NgxTimerModule } from 'ngx-timer';
import { ModalBoxComponent } from './shared/components/modal-box/modal-box.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    DashboardComponent,
    CheckBoxComponent,
    ModalBoxComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    NgxTimerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
