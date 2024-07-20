import { imageCollection } from "./imageCollectionDto"

export class behaviorFrame{
    frame : string=''
    frameDescription : string=''
    frameGroup : string =''
    frameIcon : string = ''
    frameIcon2 : string =''
    frameParentGuid : string =''
    framePath : string =''
    frameType : number=0
    frameguid : string=''
    isNavigated : boolean= false
    id : number=4
    lastUpdatedBy : string = ''
    lastUpdatedDate : (new () => Date) | undefined;
    sequenceNumber : number= 0
    isParentNavigated: boolean = false;
    treeLevel: number=0;
    isSubFolder: boolean=false;
    isSubFolderNavigated: boolean=false;
    imCol? : imageCollection
    children : behaviorFrame[] = [];
}




export class BehaviorFrameDto {
    id: number = 0;
    frame: string | null = null;
    frameDescription: string | null = null;
    frameType: number = 0;
    frameGroup: string | null = null;
    iSNavigated: number = 0;
    sequenceNumber: number = 0;
    guid: string = '';
    frameParentGuid: string = '';
    frameIcon: string | null = null;
    frameIcon2: string | null = null;
    framePath: string | null = null;
    lastUpdatedBy: string | null = null;
    lastUpdatedDate: Date = new Date();
    imCol: ImageCollectionDto | null = null;
    children: BehaviorFrameDto[] | null = null;
  }

  export class ImageCollectionDto {
    id: number =0;
    sourceLink: string | null = '';
    rootFolder: string | null ='';
    directoryFolder: string | null ='';
    fileName: string | null ='';
    fileExtension: string | null ='';
    imageGuid: string ='';
    lastUpdatedDate: string =''; // Representing date as string, adjust as needed
    lastUpdatedBy: string | null ='';
  }


  export interface BehaviorFrameMessage {
    supDet?: SupplicateDetails;
    ackDet?: AcknowledgeDetail;
  }
  
  export interface SupplicateDetails {
    name?: string ;
  }
  
  export interface AcknowledgeDetail {
    behFDList?: BehaviorFrameDto[];
  }