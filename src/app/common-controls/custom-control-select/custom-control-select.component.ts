import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { customcontrolselect } from "./custom-control-select.control";
import { KeyValue } from "@angular/common";

@Component({
    selector: 'app-custom-control-select',
    templateUrl: './custom-control-select.component.html'
})
export class customselectcontrol  implements OnInit{
    @Input() formContr : customcontrolselect;
    
    @Input() dDownList: KeyValue<string, string>[] = [];
    @ViewChild("input") private _input?: ElementRef;
    constructor() {
        this.formContr = new customcontrolselect('')
    }
    ngOnInit(){
        console.log(this.formContr)
    }
    get selectedData(): string | undefined {
        const dropdownOriData: KeyValue<string, string>[] = this.dDownList;
        let data : string | undefined 
        data = dropdownOriData.find(data => data.key === this.formContr.value)?.value;
        return data
    }
}