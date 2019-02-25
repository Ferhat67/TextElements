import { Component, OnInit } from '@angular/core';
import { EditorService } from '../services/editor.service';

@Component({
  selector: 'te-search-page',
  template: `
    
    <filter-list-aw [listItems]="getListItems()" (delete)="delete($event)"></filter-list-aw>
  `,
  styles: [`
    .keyword { cursor: pointer }
  `]
})
export class SearchPageComponent implements OnInit {

  editor: EditorService

  constructor(editor: EditorService) {
    this.editor = editor;
  }

  ngOnInit() {
  }

  getListItems() {
    return this.editor.getTextElements().map(element => {
      return {
        title: element.keyword,
        path: `/editor/${element.keyword}`,
        fields: [element.german]
      };
    });
  }

  edit(element) {
    this.editor.edit(element)
  }

  delete(keyword: string) {
    this.editor.remove(keyword);
  }

}
