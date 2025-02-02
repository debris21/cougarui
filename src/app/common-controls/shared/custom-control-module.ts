import { NgModule } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { customcontrolComponent } from '../costum-control/abstract-custom-control.component';
import { customtextcontrol } from '../custom-control-text/custom-control-text.component';
import { customselectcontrol } from '../custom-control-select/custom-control-select.component';
import { navsComponent } from 'src/app/master-root/navs/navs.component';
import { customdatecontrol } from '../custom-control-date/custom-control-date.component';
import { CustomDialogMessageComponent, CustomDialogService } from '../costum-dialog-message/costum-dialog-message.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [customcontrolComponent,
    customtextcontrol,
    customselectcontrol,
    navsComponent,
    customdatecontrol,
    CustomDialogMessageComponent
  ],
  imports: [
    MatTreeModule,
    MatDialogModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  exports : [customcontrolComponent,
    customtextcontrol,
    customselectcontrol,
    navsComponent,
    customdatecontrol,
    CustomDialogMessageComponent
  ],
  providers: [CustomDialogService]
})
export class customControlModule { }
