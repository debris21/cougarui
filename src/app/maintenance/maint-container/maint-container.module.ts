import { NgModule } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MiantContainerComponent } from './maint-container.component';


@NgModule({
  declarations: [
    MiantContainerComponent
  ],
  imports: [
    MatTreeModule,
    MatDialogModule,
    RouterModule.forChild([{path: '',component: MiantContainerComponent }]),
    ReactiveFormsModule,
    RouterModule
  ],
  providers: []
})
export class MiantContainerModule { }
