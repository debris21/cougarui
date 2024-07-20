import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { customcontroltext } from "./custom-control-text.control";

@Component({
    selector: 'app-custom-control-text',
    templateUrl: './custom-control-text.component.html',
    styleUrls : ['../shared/shared.style.css']
})
export class customtextcontrol {
    @Input() formContr : customcontroltext;
    @ViewChild("input") private _input?: ElementRef;
    constructor() {
        this.formContr = new customcontroltext('')
    }
}