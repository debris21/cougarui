import { Component, Inject, Injectable } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Observable } from "rxjs";

@Component({
    selector : 'app-custom-dialog-meesage',
    templateUrl: './costum-dialog-message.component.html',
})
export class CustomDialogMessageComponent
{
    isInfo : boolean = true;
    isError : boolean = true;
    isConfirmation : boolean = true;
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<CustomDialogMessageComponent>, private dialog: MatDialog) {
        this.isInfo = data.dialogType =='Info' 
        this.isError = data.dialogType =='Error' 
        this.isConfirmation = data.dialogType =='Confirmation' 
    }
    btnOk(evt : boolean){
        this.dialogRef.close(evt);
        if(!evt){
            this.dialog.closeAll();
        }
    }
}
@Injectable({
    providedIn: 'root'
})
export class CustomDialogService {
private dialogRef?: MatDialogRef<any>;

constructor(private dialog: MatDialog) {}
    ShowMessageInfo(message : string): void {
        this.dialogRef = this.dialog.open(CustomDialogMessageComponent, {
            width : '700px',
            height : 'auto',
            disableClose : true,
            data : {message : message,
                dialogType : 'Info'},
        });
    }
    ShowMessageError(message : string): void {
        this.dialogRef = this.dialog.open(CustomDialogMessageComponent, {
            width : '700px',
            height : 'auto',
            disableClose : true,
            data : {message : message,
                dialogType : 'Error'},
        });
    }
    closeDialog(evt : boolean): void {
        if (this.dialogRef) {
        this.dialogRef.close(evt);
        }
    }
    showConfirmation(message: any): Observable<boolean> {
        return this.dialog.open(CustomDialogMessageComponent, {
            data : {message : message,
                dialogType : 'Confirmation'},
            disableClose: true
        }).afterClosed();
    }
}