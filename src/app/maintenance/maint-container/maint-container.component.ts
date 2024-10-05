import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-maint-container',
  templateUrl: './maint-container.component.html',
})
export class MiantContainerComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  
  ngOnInit(): void {
  }
  onActivate(event : any){
    console.log(event)
  }
  onDeactivate(a : any){
    console.log('Just Deactivate:', a)
  }
}
