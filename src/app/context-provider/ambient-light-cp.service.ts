import { Injectable } from '@angular/core';
import { ContextProvider, UpdateMethod } from 'cbaui';

declare var AmbientLightSensor: any;

@Injectable()
export class AmbientLightCP extends ContextProvider{

  constructor() {
    // call base class constructor
    super(UpdateMethod.INTERVAL, 10000);

    // initialize default brightness value
    this.addContextParam({contextOfUse: 'environment', key: 'brightness', value: 'normal'});
    this.updateContext();

    // if AmbientLightSensor
    if ("AmbientLightSensor" in window) {
      const sensor = new AmbientLightSensor();
      sensor.addEventListener("reading", (event) => this.ambientLightChanged(sensor.illuminance));
      sensor.start();
    }
  }

  ambientLightChanged(lux: number) {
    if (lux > 1000)
      this.modifyContextParam('brightness', 'high');
    else if  (lux < 100)
      this.modifyContextParam('brightness', 'low');
    else
      this.modifyContextParam('brightness', 'normal');
  }
}
