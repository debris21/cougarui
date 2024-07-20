import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { customcontroldate } from "./custom-control-date.control";

@Component({
    selector: 'app-custom-control-date',
    templateUrl: './custom-control-date.component.html',
    styleUrls : ['../shared/shared.style.css']
})
export class customdatecontrol {
    @Input() formContr : customcontroldate;
    @ViewChild("input") private _input?: ElementRef;
    constructor() {
        this.formContr = new customcontroldate('')
    }
    preventTyping(event: KeyboardEvent): void {
        event.preventDefault();
    }
}