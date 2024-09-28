import { NgModule } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import { customControlModule } from 'src/app/common-controls/shared/custom-control-module';
import { CustomDialogService } from 'src/app/common-controls/costum-dialog-message/costum-dialog-message.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator'
import { UserAccountInfoComponent } from './user-account-info.component';
import { UserAccountInfoDetailComponent } from './user-account-info-details/user-account-info.details.component';


@NgModule({
  declarations: [
    UserAccountInfoComponent,
    UserAccountInfoDetailComponent
  ],
  imports: [
    MatTreeModule,
    MatDialogModule,
    RouterModule.forChild([{path: '',component: UserAccountInfoComponent}]),
    ReactiveFormsModule,
    CommonModule,
    customControlModule,
    MatIconModule,
    MatPaginatorModule
  ],
  providers: [
    CdkDropList,
     CdkDrag,CustomDialogService]
     
})
export class UserAccountInfoModule { }
