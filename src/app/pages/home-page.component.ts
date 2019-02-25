import { Component, OnInit } from '@angular/core';
import { LocalRP } from '../rule-provider/local-rp.service';
import { RuleProvider } from 'cbaui';

@Component({
  selector: 'te-home-page',
  template: `
    <h3>Home</h3>
    
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
      Disable menu position adaptation
    </button>
    
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Disable adaptive menu?</h5>
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Do you want to disable adaptive menu positioning?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" (click)="disableAdaptiveMenuPositioning()">Yes</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class HomePageComponent {

  private ruleProvider: RuleProvider;

  constructor(rp: LocalRP) {
    this.ruleProvider = rp;
  }

  disableAdaptiveMenuPositioning() {
    this.ruleProvider.removeRule("LEFTHANDED");
    this.ruleProvider.removeRule("RIGHTHANDED");
  }
}
