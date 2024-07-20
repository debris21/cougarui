import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { customcontrolselect } from "./custom-control-select.control";
import { KeyValue } from "@angular/common";

@Component({
    selector: 'app-custom-control-select',
    templateUrl: './custom-control-select.component.html',
    styleUrls : ['../shared/shared.style.css']
})
export class customselectcontrol {
    @Input() formContr : customcontrolselect;
    
    @Input() dDownList: KeyValue<string, string>[] = [];
    @ViewChild("input") private _input?: ElementRef;
    constructor() {
        this.formContr = new customcontrolselect('')
    }
}