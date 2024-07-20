import { NgModule } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatDialogModule } from '@angular/material/dialog';
import { FrameConfigComponent } from './app-frm-config.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { customControlModule } from 'src/app/common-controls/custom-contol-module';
import {CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    FrameConfigComponent
  ],
  imports: [
    MatTreeModule,
    MatDialogModule,
    RouterModule.forChild([{path: '',component: FrameConfigComponent }]),
    ReactiveFormsModule,
    CommonModule,
    customControlModule,
  ],
  providers: [
    CdkDropList,
     CdkDrag]
})
export class FrameConfigModule { }
