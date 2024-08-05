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
import { FrameConfigDetailComponent } from './app-frm-config-details/app-frm-config-details.component';
import { take } from 'rxjs';
import { CustomDialogMessageComponent, CustomDialogService } from 'src/app/common-controls/costum-dialog-message/costum-dialog-message.component';
import { PageEvent, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-frame-config',
  templateUrl: './app-frm-config.component.html',
})
export class FrameConfigComponent implements OnInit {
  @Output() sendFrameS: EventEmitter<any> = new EventEmitter();
  @Output() loadData: EventEmitter<any> = new EventEmitter();
  dataGridEntity : any;
  public form : BehaviorFrameFormGroup;
  err : any;
  sd: SupplicateDetails | undefined;
  bfm : BehaviorFrameMessage | undefined;
  frameList:BehaviorFrame[]=[];
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
    this.getMatIcons();
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

  matIcons : any
  matIconsList : any
  getMatIcons(){
    this.err = undefined
    this.bfm = {
      supDet: this.sd ={
        name : 'asas'
      }
    }

    
    this.fs.getBehaviorFrame(this.bfm, 'cougarapi', 'getmaticon').subscribe(ack =>{
      console.log(ack)
      this.matIcons = ack;
      this.matIconsList = this.paginate(this.matIcons, 10, 1);
    },
    error => {
      this.err = error
    })
  }

  mapFrames(frames : BehaviorFrame[]) : BehaviorFrame[]{
    let frameList = frames?.map((itm: BehaviorFrame) => {
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
    return frameList
  }
  getFrame(){
    this.err = undefined
    this.bfm = {
      supDet: this.sd ={
        name : 'asas'
      }
    }
    this.fs.getBehaviorFrame(this.bfm, 'cougarapi', 'getframe').subscribe(ack =>{
      this.frameList = this.mapFrames(ack.res.frameList);
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
    const dialogReference = this.dialog.open(FrameConfigDetailComponent, {
      width: '1500px',
      height: 'auto',
      data: {form : this.form.value,
        parentDDownList : this.dDownList},
      disableClose : true
    })
    dialogReference.afterClosed().pipe(take(1)).subscribe((res: any) => {
      if(res){
        this.form.patchValue(res?.form)
        this.btnSubmit(res?.btnEvent);
      }
    });
    return bfra.isSelected ? true : false;
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
            this.frameList = this.mapFrames(ack.res.frameList);
            this.frameList[0].isSelected = true;
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
  
  length = 10;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent?: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.matIconsList = this.paginate(this.matIcons, this.pageSize, this.pageIndex);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  paginate<T>(array: T[], pageSize: number, pageNumber: number): T[] {
    const startIndex = (pageNumber - 1) * pageSize;
    return array.slice(startIndex, startIndex + pageSize);
  }
  changeText(text: any) {
    const inputElement = text.target as HTMLInputElement;
    const searchText = inputElement.value;
    const filteredList = this.matIcons?.filter((r : any) => r.iconTag?.includes(searchText));
    this.matIconsList = this.paginate(filteredList, 10, 1);
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
export class BehaviorFrame {
  frameNumber ?: string;
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