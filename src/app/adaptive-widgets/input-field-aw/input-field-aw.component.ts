import { Component, Input, OnInit } from '@angular/core';
import { AdaptiveWidget, AdaptationAction, AdaptationController } from 'cbaui';

@Component({
  selector: 'input-field-aw',
  templateUrl: './input-field-aw.component.html',
  styleUrls: ['./input-field-aw.component.css']
})
export class InputFieldAWComponent extends AdaptiveWidget {

  @Input('label') label : string;
  @Input('placeholder') placeholder : string;
  @Input('helpText') helpText : string;
  @Input('value') value : string;

  readonly: boolean = false;
  showHelpText: boolean = false;

  constructor(ac: AdaptationController) {
    super(ac, "InputFieldAW");
  }

  adapt(action: AdaptationAction) {
    switch (action.name) {
      case 'SET_READONLY_MODE':
        this.readonly = action.params.active;
        break;
      case 'SHOW_HELP_TEXT':
        this.showHelpText = true;
        break;
      case 'HIDE_HELP_TEXT':
        this.showHelpText = false;
        break;
    }
  }

}
