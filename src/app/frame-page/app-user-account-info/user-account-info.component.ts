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
import { take } from 'rxjs';
import { CustomDialogMessageComponent, CustomDialogService } from 'src/app/common-controls/costum-dialog-message/costum-dialog-message.component';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { UserAccountInfoDetailComponent } from './user-account-info-details/user-account-info.details.component';

@Component({
  selector: 'app-frame-config',
  templateUrl: './user-account-info.component.html',
})
export class UserAccountInfoComponent implements OnInit {
  @Output() sendFrameS: EventEmitter<any> = new EventEmitter();
  @Output() loadData: EventEmitter<any> = new EventEmitter();
  dataGridEntity : any;
  public form : BehaviorFrameFormGroup;
  err : any;
  sd: SupplicateDetails | undefined;
  bfm : BehaviorFrameMessage | undefined;
  message : string = '';
  public dDownList: KeyValue<string, string>[] = [];
  constructor(public dialog: MatDialog, private fs: ApproachpartService,
    private dlog : CustomDialogService
  ) {
    this.form = new BehaviorFrameFormGroup();
  }
  ngOnInit(): void {
    this.getFrame();
    this.getDropdownData();
  }
  public gridPageChange(paginator: any) {
    this.dataGridEntity.pageIdx = paginator.pageIndex;
    this.dataGridEntity.pageSize = paginator.pageSize;
    //this.filter.setGridPaging(this.dataGridEntity.pageIdx);
    this.loadData.emit(this.dataGridEntity);
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
    },
    error => {
      this.err = error
    })
  }
  btnSubmit(event : string) : boolean {
    let load = true;
    if(this.form.invalid && event !='deleteBFrame' ){
      this.form.markAllAsTouched();
    }
    else{
        this.fs.getBehaviorFrame(this.form.value, 'cougarapi', event).subscribe(ack =>{
          this.message = ack?.res?.rInfo?.message;
          this.dlog.ShowMessageInfo(this.message);
          if(ack.res.frameList){
          }
          load = false
          //this.getFrame();
        },
      error => {
        this.err = error
        this.dlog.ShowMessageError(error.message)
      })
    }
    
    return load;
  }
  getKeyDate(key : any){
    console.log(key)
  }

  paginate<Rome>(array: Rome[], pageSize: number, pageNumber: number): Rome[] {
    const startIndex = (pageNumber - 1) * pageSize;
    return array.slice(startIndex, startIndex + pageSize);
  }}

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
  get frameGuidFC(): customcontroltext { return this.controls['frameGuid'] as customcontroltext; }
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
export interface UserLogInfo {
  id?: number;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
  phone?: string;
  profilePictureUrl?: string;
  gender?: string;
  birthday?: Date | null;
  locale?: string;
  accessToken?: string;
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


export interface MaterialIconDTO {
  id?: number;
  iconTag?: string;
  iconDescription?: string;
  category?: string;
  createdDate?: string;  // ISO 8601 string format for DateTime
  createdBy?: string;
  updatedDate?: string | null;  // ISO 8601 string or null
  updatedBy?: string | null;  // string or null
  status?: number;
}