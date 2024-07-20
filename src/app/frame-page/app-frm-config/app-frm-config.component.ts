import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { KeyValue } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { customcontroldate } from 'src/app/common-controls/custom-control-date/custom-control-date.control';
import { customcontrolselect } from 'src/app/common-controls/custom-control-select/custom-control-select.control';
import { customcontroltext } from 'src/app/common-controls/custom-control-text/custom-control-text.control';
import { stringhelper } from 'src/app/common-controls/shared/string-helper';
import { BehaviorFrameMessage, SupplicateDetails } from 'src/app/Message/behaviorFrame';
import { ApproachpartService } from 'src/services/approachpart.service';
import { BasicInfoComponent } from '../basic-info/basic-info.component';

@Component({
  selector: 'app-frame-config',
  templateUrl: './app-frm-config.component.html',
})
export class FrameConfigComponent implements OnInit {
  @Output() sendFrameS: EventEmitter<any> = new EventEmitter();
  public form : BehaviorFrameFormGroup;
  err : any;
  sd: SupplicateDetails | undefined;
  bfm : BehaviorFrameMessage | undefined;
  frameList:BehaviorFrame[]=[];
  message : string = '';
  public dDownList: KeyValue<string, string>[] = [];
  constructor(public dialog: MatDialog,private fs: ApproachpartService) {
    this.form = new BehaviorFrameFormGroup();
  }
  ngOnInit(): void {
    this.getFrame();
    this.getDropdownData();
  }

 logInvalidControls(form : BehaviorFrameFormGroup): void {
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (control?.invalid) {
        console.log(`The control ${key} is invalid. Errors: `, control.errors);
      }
    });
  }
  getDropdownData(){
    this.err = undefined
    this.bfm = {
      supDet: this.sd ={
        name : 'asas'
      }
    }

    
    this.fs.getBehaviorFrame(this.bfm, 'dropdown', 'getframe').subscribe(ack =>{
      this.dDownList = ack;
    },
    error => {
      this.err = error
    })
  }
  getFrame(){
    this.err = undefined
    this.bfm = {
      supDet: this.sd ={
        name : 'asas'
      }
    }
    this.fs.getBehaviorFrame(this.bfm, 'cougarapi', 'getframe').subscribe(ack =>{
      this.frameList = ack.res.behF_DList.map((itm: BehaviorFrame) => {
        return {
          frameNumber: itm.frameNumber,
          frame: itm.frame || '',
          frameDescription: itm.frameDescription || '',
          frameType: itm.frameType || '',
          frameGroup: itm.frameGroup || '',
          ordering: itm.ordering || 0,
          frameParentGuid: itm.frameParentGuid || '',
          frameIcon: itm.frameIcon || '',
          frameIcon2: itm.frameIcon2 || '', 
          framePath: itm.framePath || '',
          createdDate: stringhelper.formatDateToDatetimeLocal(itm.createdDate), 
          createdBy: itm.createdBy || '',
          updatedDate: stringhelper.formatDateToDatetimeLocal(itm.updatedDate),
          updatedBy: itm.updatedBy || '',
          status: itm.status || 1, 
          parentDesc: itm.parentDesc,
          frameGuid : itm.frameGuid,
          list: itm,
          createdDateDispl:stringhelper.FormatDateTime(itm.createdDate) ,
          updatedDateDispl: stringhelper.FormatDateTime(itm.updatedDate),
          isSelected: itm.isSelected
        };
      });
      this.frameList[0].isSelected = true
    },
    error => {
      this.err = error
    })
  }
  bfra? : BehaviorFrame
  sendFrame(bfra : BehaviorFrame)  : boolean{
    this.bfra = bfra;
    this.message = ''
    console.log(1)
    this.frameList.forEach(r => {
      r.isSelected = false;
      if(r.frameGuid == bfra.frameGuid){
        r.isSelected = true;
      }
    })
    this.sendFrameS.emit(bfra)
    bfra.createdDate = stringhelper.formatDateToDatetimeLocal(bfra.createdDate)
    bfra.updatedDate = stringhelper.formatDateToDatetimeLocal(bfra.updatedDate)
    this.form.updateValueAndValidity();
    this.form.patchValue(bfra)
    this.dialog.open(BasicInfoComponent, {
      width: '450px',
      height: 'auto',
      data: this.form.value
  })
    return bfra.isSelected ? true : false;
  }
  btnSubmit(event : string) : boolean {
    let load = true;
    if(this.form.invalid && event !='deleteBFrame' ){
      this.logInvalidControls(this.form)
      this.form.markAllAsTouched();
    }
    else{
        this.fs.getBehaviorFrame(this.form.value, 'cougarapi', event).subscribe(ack =>{
          this.message = ack.message;
          load = false
          this.getFrame();
        },
      error => {
        this.err = error
        alert('Sebmit error :' + error.message);
      })
    }
    
    return load;
  }
  getKeyDate(key : any){
    console.log(key)
  }
  isSelectedRow(row: any): boolean {
    return ObjectUtil.deepCompare(this.frameList,row);
  }
}

export class BehaviorFrameFormGroup extends FormGroup{
  constructor() {
      super(
        {
          frameNumber: new  customcontroltext('', [Validators.required], undefined, 'Frame Number'),
          frame: new  customcontroltext('', [Validators.required], undefined, 'Frame'),
          frameGuid: new  customcontroltext('', [Validators.required], undefined, 'frameGuid'),
          frameDescription:  new  customcontroltext('', [Validators.required], undefined, 'Frame Description'),
          frameType:  new  customcontroltext('', [Validators.required], undefined, 'Frame Type'),
          frameGroup:  new  customcontroltext('', [Validators.required], undefined, 'Frame Group'),
          ordering:  new  customcontroltext('', [Validators.required], undefined, 'Ordering'),
          frameParentGuid:  new  customcontrolselect('', [Validators.required], undefined, 'Frame Parent Description'),
          frameIcon:  new  customcontroltext('', [], undefined, 'Frame Icon'),
          frameIcon2:  new  customcontroltext('', [], undefined, 'Frame Icon 2'),
          framePath:  new  customcontroltext('', [], undefined, 'Frame Path'),
          createdDate:  new  customcontroldate('', [], undefined, 'Created Date'),
          createdBy:  new  customcontroltext('', [], undefined, 'Created By'),
          updatedDate:  new  customcontroldate('', [Validators.required], undefined, 'Updated Date'),
          updatedBy:  new  customcontroltext('', [Validators.required], undefined, 'Updated By'),
          status:  new  customcontroltext('', [], undefined, 'Status'),
        }
      );
  }
  get frameNumberFC(): customcontroltext { return this.controls['frameNumber'] as customcontroltext; }
  get frameFC(): customcontroltext { return this.controls['frame'] as customcontroltext; }
  get frameDescriptionFC(): customcontroltext { return this.controls['frameDescription'] as customcontroltext; }
  get frameTypeFC(): customcontroltext { return this.controls['frameType'] as customcontroltext; }
  get frameGroupFC(): customcontroltext { return this.controls['frameGroup'] as customcontroltext; }
  get orderingFC(): customcontroltext { return this.controls['ordering'] as customcontroltext; }
  get frameParentNumberFC(): customcontrolselect { return this.controls['frameParentGuid'] as customcontrolselect; }
  get frameIconFC(): customcontroltext { return this.controls['frameIcon'] as customcontroltext; }
  get frameIcon2FC(): customcontroltext { return this.controls['frameIcon2'] as customcontroltext; }
  get framePathFC(): customcontroltext { return this.controls['framePath'] as customcontroltext; }
  get createdDateFC(): customcontroldate { return this.controls['createdDate'] as customcontroldate; }
  get createdByFC(): customcontroltext { return this.controls['createdBy'] as customcontroltext; }
  get updatedDate(): customcontroldate { return this.controls['updatedDate'] as customcontroldate; }
  get updatedByFC(): customcontroltext { return this.controls['updatedBy'] as customcontroltext; }
}
export class BehaviorFrame {
  frameNumber: number = 0;
  frame: string = '';
  frameGuid: string = '';
  frameDescription: string = '';
  frameType: string = '';
  frameGroup: string = '';
  ordering: number = 0;
  frameParentGuid?: string = '';
  frameIcon: string = '';
  frameIcon2?: string = ''; // Optional property indicated by `?`
  framePath: string = '';
  createdDate ?: string; // Assuming `DateTime` is converted to `Date` in TypeScript
  createdBy: string = '';
  updatedDate ?: string;
  updatedBy: string = '';
  status: number = 1; 
  parentDesc ? : string;
  list ?: BehaviorFrame;
  createdDateDispl ?: string;
  updatedDateDispl ?: string;
  isSelected? : boolean;
}

export enum frametype {
  Frame = 'FRAME',
  Widget = 'WIDGET',
}
export class ResponseInfo{
  status ? : number
  count ? : number
  message ? : string
}


export class ObjectUtil {
  public static deepCompare(obj1: any, obj2: any): boolean {
    if (obj1 == null && obj2 == null) return true;
    if (obj1 == null || obj2 == null) return false;

    // Loop through properties in object 1
    for (const prop in obj1) {
      if (obj1.hasOwnProperty(prop)) {
        // Check property exists on both objects
        if (obj1.hasOwnProperty(prop) !== obj2.hasOnProperty(prop)) {
          return false;
        }

        switch (typeof (obj1[prop])) {
          // Deep compare objects
          case 'object':
            if (!ObjectUtil.deepCompare(obj1[prop], obj2[prop])) {
              return false;
            }
            break;
          // Compare function code
          case 'function':
            if (typeof (obj2[prop]) === 'undefined' || (prop != 'compare' && obj1[prop].toString() != obj2[prop].toString())) {
              return false;
            }
            break;
          // Compare values
          default:
            if (obj1[prop] != obj2[prop]) {
              return false;
            }
        }
      }

    }
    // Check object 2 for any extra properties
    for (const p in obj2) {
      if (!!obj1) {
        if (typeof (obj1[p]) == 'undefined' && (typeof (obj2[p]) != 'undefined')) {
          return false;
        }
      }
    }
    return true;
  }
}