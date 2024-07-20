import { NgModule } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatDialogModule } from '@angular/material/dialog';
import { BasicInfoComponent } from './basic-info.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BasicInfoComponent
  ],
  imports: [
    MatTreeModule,
    MatDialogModule,
    RouterModule.forChild([{path: '',component: BasicInfoComponent }]),
    ReactiveFormsModule,
  ],
  providers: []
})
export class BasicInfoModule { }
