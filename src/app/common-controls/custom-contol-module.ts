import { NgModule } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { customcontrolComponent } from './costum-control/abstract-custom-control.component';
import { customtextcontrol } from './custom-control-text/custom-control-text.component';
import { CommonModule } from '@angular/common';
import { customselectcontrol } from './custom-control-select/custom-control-select.component';
import { navsComponent } from '../master-root/navs/navs.component';
import { customdatecontrol } from './custom-control-date/custom-control-date.component';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [customcontrolComponent,
    customtextcontrol,
    customselectcontrol,
    navsComponent,
    customdatecontrol
  ],
  imports: [
    MatTreeModule,
    MatDialogModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  exports : [customcontrolComponent,
    customtextcontrol,
    customselectcontrol,
    navsComponent,
    customdatecontrol
  ],
  providers: []
})
export class customControlModule { }
