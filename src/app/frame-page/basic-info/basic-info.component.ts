import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { navsComponent } from 'src/app/master-root/navs/navs.component';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  providers: [DatePipe],
})
export class BasicInfoComponent implements OnInit {
  fg? : FormGroup
  selectedDate!: Date;
  constructor(public dialog: MatDialog,
    private datePipe: DatePipe) {}
  myFormControl = new FormControl('', [Validators.required]);
  
  ngOnInit(): void {
    this.fg?.addControl('sas', this.myFormControl)
  }

  // clickButton(): void {
  //   // this.dialog.open(navsComponent, {
  //   //   width: '250px',
  //   //   height:'300px'
  //   // });


  //   this.myFormControl.markAllAsTouched();
  //   console.log(this.myFormControl)
  // }
  clickButton(): void {
    this.myFormControl.markAllAsTouched();
    console.log(this.myFormControl)
  } 
}
