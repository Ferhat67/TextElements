import { Injectable } from '@angular/core';
import { ContextProvider, UpdateMethod } from 'cbaui';

declare var window: any;

@Injectable()
export class HandednessCP extends ContextProvider{

  constructor() {
    // call base class constructor. publish context info every 200ms for performance reasons
    super(UpdateMethod.EVENT_BASED);
    // Initialize context parameter for handedness
    this.addContextParam({contextOfUse: 'user', key: 'handedness', value: 'unknown'});
    this.monitorDeviceInclination(); // Start monitoring device tilt
  }

  monitorDeviceInclination() {
    if ('DeviceOrientationEvent' in window)
      window.addEventListener('deviceorientation', (angles) => this.inferHandedness(angles.gamma), false);
  }

  inferHandedness(inclinationAngle: number) {
    if (inclinationAngle > 30 && this.getContextParam('handedness').value != 'left') {
      this.modifyContextParam('handedness', 'left');
      this.updateContext();
    }
    else if (inclinationAngle < -30 && this.getContextParam('handedness').value != 'right') {
      this.modifyContextParam('handedness', 'right');
      this.updateContext();
    }
  }
}
