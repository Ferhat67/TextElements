import { Component, Input, OnInit } from '@angular/core';
import { AdaptiveWidget, AdaptationAction, AdaptationController } from 'cbaui';

export interface MenuItem {
  label: string;
  icon: string;
  path?: string;
  hidden?: boolean;
}

@Component({
  selector: 'app-shell-aw',
  templateUrl: './app-shell-aw.component.html',
  styleUrls: ['./app-shell-aw.component.css']
})
export class AppShellAWComponent extends AdaptiveWidget implements OnInit {

  @Input('title') title = "";
  @Input('menuItems') menuItems: MenuItem[];

  menuMode: string = 'normal';
  sidebarOpen: boolean = false;

  @Input('colors') colors = {
  };

  classes = {
    sidebar: {"d-block": false, "order-last": false, "dark-theme": false, "overlay": false},
    toggle: {"order-last": false},
    menu: {"dark-theme": false},
    header: {"dark-theme": false},
    content: {"dark-theme": false},
  };

  constructor(ac: AdaptationController) {
    super(ac, "AppShellAW");
  }

  ngOnInit() {
  }

  adapt(action: AdaptationAction) {
    switch (action.name) {
      case "SET_MENU_POSITION":
        const positionRight = action.params.position === 'right';
        this.classes.sidebar["order-last"] = positionRight;
        this.classes.toggle["order-last"] = positionRight;
        break;
      case "COMPACT_MODE":
        const active: boolean = action.params.active;
        this.menuMode = (active) ? 'compact' : 'normal';
        break;
      case "SET_DARK_THEME":
        this.classes.sidebar["dark-theme"] = action.params.active;
        this.classes.header["dark-theme"] = action.params.active;
        this.classes.content["dark-theme"] = action.params.active;
        this.classes.menu["dark-theme"] = action.params.active;
        break;
    }
  }

  getMenuItems() {
    return this.menuItems;
  }

  toggleSidebar() {
    if (this.sidebarOpen) {
      this.sidebarOpen = false;
      this.classes.sidebar["d-block"] = false;
      this.classes.sidebar["d-none"] = true;
      this.classes.sidebar["overlay"] = false;
    }
    else {
      this.sidebarOpen = true;
      this.classes.sidebar["d-block"] = true;
      this.classes.sidebar["d-none"] = false;
      this.classes.sidebar["overlay"] = true;
    }
  }
}
