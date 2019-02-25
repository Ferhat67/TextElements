import { Injectable } from '@angular/core';
import { ContextProvider, UpdateMethod } from 'cbaui';

declare var window: any;

@Injectable()
export class NetworkCP extends ContextProvider{

  constructor() {
    // call base class constructor. publish context info every 5 seconds
    super(UpdateMethod.EVENT_BASED);
    // initial context value
    this.addContextParam({contextOfUse: 'platform', key: 'online', value: window.navigator.onLine});
    // listen for online / offline changes
    window.addEventListener('online', () => this.updateOnlineStatus());
    window.addEventListener('offline', () => this.updateOnlineStatus());
  }

  updateOnlineStatus() {
    this.modifyContextParam('online', window.navigator.onLine);
    this.updateContext();
  }
}
