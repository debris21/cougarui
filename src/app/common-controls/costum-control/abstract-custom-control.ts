import { Input, Pipe, PipeTransform } from "@angular/core";
import { FormControl } from "@angular/forms";

export abstract class AbstractCustomControl extends FormControl {
  label : string
  constructor(formState?: any, validatorOrOpts?: any, asyncValidator?: any, label : string = '') {
    super(formState, validatorOrOpts, asyncValidator);
    this.label = label ;
  }
  getErrorMessage() : string[] {
    let messages: string[] = [];
    for (let errorName in this.errors){
      switch (errorName) {
        case 'required':
            this._addValidationMessage('required', `Required. `, messages);
            break;
        case 'minlength':
            this._addValidationMessage('minlength', `Minimum length should be ${this.errors['minlength'].requiredLength}. `, messages);
            break;
        case 'maxlength':
            this._addValidationMessage('maxlength', `Maximum length should be ${this.errors['maxlength'].requiredLength}. `, messages);
            break;
        case 'min':
            this._addValidationMessage('min', `Minimum value should be ${this.formatMinValue(this.errors['min'].min)}. `, messages);
            break;
        case 'max':
            this._addValidationMessage('max', `Minimum value should be ${this.formatMaxValue(this.errors['max'].max)}. `, messages);
            break;
        case 'pattern':
            this._addValidationMessage('pattern', `Contain invalid characters. `, messages);
            break;
        case 'nozero':
            this._addValidationMessage('nozero', `No zero. `, messages);
            break;
        default:
            this._addValidationMessage(errorName, `project.baseControls.errors.custom;${errorName}`, messages);
      }
    }
    return messages;
  }
  formatMinValue(value : number) {
      return value;
  }

  formatMaxValue(value : number) {
      return value;
  }
  public getDisableRequireMsg(): string {
    const err: string = `project.baseControls.errors.required;${this.label}`;
    return err;
  }

  private _addValidationMessage(key: string, autoValidationMessage: string, messages: string[]) {
          messages.push(autoValidationMessage);
  }
}

export class ConcreteCustomControl extends AbstractCustomControl {
  constructor(formState?: any, validatorOrOpts?: any, asyncValidator?: any, label : string = '') {
    super(formState, validatorOrOpts, asyncValidator);
    this.label = label;
  }

  customMethod(): void {
    // Implementation of the custom method
    console.log('Custom method called');
  }
}