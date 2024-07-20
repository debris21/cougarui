import { NgModule } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatDialogModule } from '@angular/material/dialog';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { customControlModule } from 'src/app/common-controls/shared/custom-control-module';


@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    MatTreeModule,
    MatDialogModule,
    RouterModule.forChild([{path: '',component: DashboardComponent }]),
    ReactiveFormsModule,
    CommonModule,
    customControlModule
  ],
  providers: []
})
export class DashboardModule { }
