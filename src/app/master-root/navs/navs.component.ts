import { Component, OnInit } from '@angular/core';
import { BehaviorFrameMessage, SupplicateDetails, behaviorFrame } from 'src/app/Message/behaviorFrame';
import { ApproachpartService } from 'src/services/approachpart.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nyxa-navs',
  templateUrl: './navs.component.html'
})
export class navsComponent {
  msg1:behaviorFrame[]=[];
  err : any;
  treeControl = new NestedTreeControl<behaviorFrame>(node => node.children);
  dataSource = new MatTreeNestedDataSource<behaviorFrame>();
  sd: SupplicateDetails | undefined;
  bfm : BehaviorFrameMessage | undefined;
  constructor(private fs: ApproachpartService, private router: Router) {}
  ngOnInit(): void {
    this.err = undefined
    this.bfm = {
      supDet: this.sd ={
        name : 'asas'
      }
    }
      this.fs.getBehaviorFrame(this.bfm, 'cougarapi', 'getBehavior_Frame').subscribe(ack =>{
      this.msg1 = ack.res.behF_DList;
      this.dataSource.data = this.msg1[0].children
    },
    error => {
      this.err = error
    })
  }
  hasChild = (_: number, node: behaviorFrame) => !!node.children && node.children.length > 0; 
  navigate(nav : string){
    this.router.navigate([nav]);
  }

}
