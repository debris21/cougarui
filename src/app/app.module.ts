import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTreeModule } from '@angular/material/tree';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AheadComponent } from './master-root/ahead/ahead.component';
import { BodyComponent } from './master-root/body/body.component';
import { FooterComponent } from './master-root/footer/footer.component';
import { NotifComponent } from './master-root/ahead/notif/notif.component';
import { UserInfoComponent } from './master-root/ahead/user-info/user-info.component';
import { NotFoundComponent } from './generic/not-found/not-found.component';
import { customControlModule } from './common-controls/custom-contol-module';


@NgModule({
  declarations: [
    AppComponent,
    AheadComponent,
    BodyComponent,
    FooterComponent,
    NotifComponent,
    UserInfoComponent,
    NotFoundComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTreeModule,
    MatDialogModule,
    BrowserAnimationsModule,
    customControlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
