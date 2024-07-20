import { NgModule } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatDialogModule } from '@angular/material/dialog';
import { FrameConfigComponent } from './app-frm-config.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import { FrameConfigDetailComponent } from './app-frm-config-details/app-frm-config-details.component';
import { customControlModule } from 'src/app/common-controls/shared/custom-control-module';
import { CustomDialogService } from 'src/app/common-controls/costum-dialog-message/costum-dialog-message.component';


@NgModule({
  declarations: [
    FrameConfigComponent,
    FrameConfigDetailComponent
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
     CdkDrag,CustomDialogService]
     
})
export class FrameConfigModule { }
