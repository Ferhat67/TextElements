import { Injectable } from '@angular/core';
import { RuleProvider } from 'cbaui';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LocalRP extends RuleProvider{

  constructor(http: HttpClient) {
    super();

    // load rules
    http.get<any[]>('assets/adaptation-rules.json').subscribe(rules => {
      if (rules && rules.length)
        rules.forEach(rule => this.addRule(rule));
    })
  }
}
