import { NgModule } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatDialogModule } from '@angular/material/dialog';
import { SettingsComponent } from './settings.component';


@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    MatTreeModule,
    MatDialogModule
  ],
  providers: [],
})
export class SettingsModule { }
