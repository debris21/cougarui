import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { customcontroltext } from 'src/app/common-controls/custom-control-text/custom-control-text.control';
import { BehaviorFrameFormGroup } from '../app-frm-config/app-frm-config.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  fg? : FormGroup
  isError : boolean = false
  public form : sampleFormGroup;
  public form1 : BehaviorFrameFormGroup;



  constructor(public dialog: MatDialog) {
    this.form = new sampleFormGroup();
    this.form1 = new BehaviorFrameFormGroup();

    
  }
  ngOnInit(): void {
  }
  onSubmit(): void {
  }
  btnclk(){
    console.log(this.form.nameFC.value)
  }
}





export class sampleFormGroup extends FormGroup{
  constructor() {
      super(
        {
          name: new customcontroltext('', [Validators.required, Validators.maxLength(5), Validators.minLength(3)], {maxlength : 10, max : 10 }, 'Name'),
          address: new customcontroltext('', [Validators.required], undefined, 'Address')
        }
      );
  }
  get nameFC(): customcontroltext { return this.controls['name'] as customcontroltext; }
  get addressFC(): customcontroltext { return this.controls['address'] as customcontroltext; }
}

