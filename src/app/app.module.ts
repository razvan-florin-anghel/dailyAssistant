import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { StartComponent } from "./pages/start/start.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { CheckBoxComponent } from "./shared/components/check-box/check-box.component";
import { NgxTimerModule } from "ngx-timer";
import { ModalBoxComponent } from "./shared/components/modal-box/modal-box.component";
import { OrderModule } from "ngx-order-pipe";
import { RemoveBtnComponent } from './shared/components/remove-btn/remove-btn.component';
import { TimerComponent } from './shared/components/timer/timer.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    DashboardComponent,
    CheckBoxComponent,
    ModalBoxComponent,
    RemoveBtnComponent,
    TimerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    NgxTimerModule,
    OrderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
