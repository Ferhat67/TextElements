import { Component, OnInit } from '@angular/core';
import { EditorService } from '../services/editor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'te-editor-page',
  template: `
    <h3>Editor</h3>
    <div class="row">
      <div class="col-6">
        <input-field-aw label="Keyword" placeholder="Keyword" [value]="editor.textElement.keyword"
                        helpText="The keyword identifies the text element"></input-field-aw>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <input-field-aw label="German" placeholder="German" [value]="editor.textElement.german"
                        helpText="This text will be used in german documents"></input-field-aw>
      </div>
      <div class="col-12 col-md-6">
        <input-field-aw label="English" placeholder="English" [value]="editor.textElement.english"
                        helpText="This text will be used in english documents"></input-field-aw>
      </div>
      <div class="col-12 col-md-6">
        <input-field-aw label="French" placeholder="French" [value]="editor.textElement.french"
                        helpText="This text will be used in french documents"></input-field-aw>
      </div>
      <div class="col-12 col-md-6">
        <input-field-aw label="Spanish" placeholder="Spanish" [value]="editor.textElement.spanish"
                        helpText="This text will be used in spanish documents"></input-field-aw>
      </div>
    </div>
  `,
  styles: []
})
export class EditorPageComponent implements OnInit {

  editor: EditorService;

  constructor(editor: EditorService, route: ActivatedRoute) {
    this.editor = editor;
    if (route.snapshot.paramMap.has('keyword')) {
      const keyword = route.snapshot.paramMap.get('keyword');
      const element = this.editor.getTextElements().find(t => t.keyword === keyword);
      this.editor.edit(element);
    }
    else {
      this.editor.reset();
      this.editor.add(this.editor.getCurrent());
    }
  }

  ngOnInit() {
  }

}
