import { Component, Inject } from "@angular/core";
import { BehaviorFrameFormGroup } from "../app-frm-config.component";
import { ApproachpartService } from "src/services/approachpart.service";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { KeyValue } from "@angular/common";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { CustomDialogMessageComponent, CustomDialogService } from "src/app/common-controls/costum-dialog-message/costum-dialog-message.component";
import { config, take } from "rxjs";

@Component({
    selector : 'app-frm-config-detail',
    templateUrl: './app-frm-config-details.component.html',
})

export class FrameConfigDetailComponent
{
    public form : BehaviorFrameFormGroup;
    public dDownList: KeyValue<string, string>[] = [];
    constructor(public dialog: MatDialog,private fs: ApproachpartService, @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<FrameConfigDetailComponent>,
    private dlog : CustomDialogService) {
        this.form = new BehaviorFrameFormGroup();
        this.dDownList = this.data.parentDDownList
        this.form.patchValue(this.data.form)
    }
    btnSubmit(evt : string) : boolean {
        let tutuloy = false
        if(evt =='deleteBFrame'){
            const dialog =  this.dlog.showConfirmation('Are you sure you want to delete frame : ' + this.form.frameFC.value +' with guid of ' + this.form.frameGuidFC.value + '.').subscribe(r =>{
                if(r){
                    this.dialogRef.close({btnEvent : evt,
                        form : this.form.value
                    });
                }
            })
        }
        else if(this.form.invalid && evt !='deleteBFrame' ){
            this.logInvalidControls(this.form)
            this.form.markAllAsTouched();
            return false
        }
        else{
            //this.dlog.openDialog('You are updating or creating frame : ' + this.form.frameFC.value)
            this.dialogRef.close({btnEvent : evt,
                form : this.form.value
            });
        }
        return tutuloy;
    }
    logInvalidControls(form : BehaviorFrameFormGroup): void {
        Object.keys(form.controls).forEach(key => {
          const control = form.get(key);
          if (control?.invalid) {
            console.log(`The control ${key} is invalid. Errors: `, control.errors);
          }
        });
    }
    frameDeleteValidator(event: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
          if (control.value === 'NYXA-WEB' && event === 'deleteBFrame') {
            return { frameDeleteError: 'Frame can not be deleted. It is a main component of the application' };
          }
          return null;
        };
      }
}