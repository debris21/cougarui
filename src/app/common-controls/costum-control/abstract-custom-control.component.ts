import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { AbstractCustomControl, ConcreteCustomControl } from "./abstract-custom-control";

@Component({
    selector: 'app-abstract-custom-control',
    templateUrl: './abstract-custom-control.component.html'
})
export class customcontrolComponent {
  @Input() frmC? : AbstractCustomControl
}


