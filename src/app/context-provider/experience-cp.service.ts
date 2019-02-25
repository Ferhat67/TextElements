import { Injectable } from '@angular/core';
import { ContextProvider, UpdateMethod } from 'cbaui';

@Injectable()
export class ExperienceCP extends ContextProvider{

  constructor() {
    super(UpdateMethod.INTERVAL, 60000); // update every minute
    // restore last value and initialize context parameter
    const experience = parseInt(localStorage.getItem("experience") || "0");
    this.addContextParam({contextOfUse: 'user', key: 'experience', value: experience || 0});
    this.updateContext();
  }

  protected updateContext() {
    const experience = this.getContextParam('experience').value;
    this.modifyContextParam('experience', experience + 1);
    localStorage.setItem("experience", experience + 1);
    super.updateContext();
  }
}
