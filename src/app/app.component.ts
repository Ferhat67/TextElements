import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TextElements';
  menuItems = [
    {icon: 'home', label: 'Home', path: '/'},
    {icon: 'search', label: 'Browse', path: '/search'},
    {icon: 'edit', label: 'Create', path: '/editor'}
  ];

  constructor() {
  }

}
