import { formatDate } from "@angular/common";

export class stringhelper{
    public static FormatDateTime(value: any): string {
        return formatDate(value, 'MMMM dd, yyyy hh:mm aa', 'en-gb');
    } 
    public static formatDateToDatetimeLocal(date : string = ''): string {
        return (formatDate(date, "yyyy-MM-dd'T'HH:mm", 'en-US'));
    }
}