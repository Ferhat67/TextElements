import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdaptiveWidget, AdaptationAction, AdaptationController } from 'cbaui';

export interface ListItem {
  title: string,
  path: string,
  fields: string[]
}

@Component({
  selector: 'filter-list-aw',
  templateUrl: './filter-list-aw.component.html',
  styleUrls: ['./filter-list-aw.component.css']
})
export class FilterListAWComponent extends AdaptiveWidget implements OnInit {

  @Input('listItems') listItems: ListItem[];
  @Output('delete') onDelete: EventEmitter<string> = new EventEmitter();

  searchTerm: string = "";
  darkTheme: boolean = false;
  searchDisabled: boolean = false;

  constructor(ac: AdaptationController) {
    super(ac, "FilterListAW");
  }

  ngOnInit() {
  }

  adapt(action: AdaptationAction) {
    switch (action.name) {
      case 'SET_DARK_THEME':
        this.darkTheme = action.params.active;
        break;
      case 'DISABLE_SEARCH':
        this.searchDisabled = true;
        break;
      case 'ENABLE_SEARCH':
        this.searchDisabled = false;
        break;
    }
  }

  getListItems() {
    if (this.searchTerm)
      return this.listItems.filter(item => item.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
    return this.listItems;
  }
}
