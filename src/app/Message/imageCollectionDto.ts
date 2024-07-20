export class imageCollection{
    id? : number;
    sourceLink? : string;
    rootFolder? : string;
    directoryFolder? : string;
    fileName? : string;
    fileExtension? : string;
    imageGuid? : string;
    lastUpdatedDate? : (new () => Date) | undefined;
    lastUpdatedBy? : string;
}