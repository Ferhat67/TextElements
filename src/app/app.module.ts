import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HomePageComponent} from './pages/home-page.component';
import {RouterModule, Routes} from '@angular/router';
import {SearchPageComponent} from './pages/search-page.component';
import {EditorPageComponent} from './pages/editor-page.component';
import {AppShellAWComponent} from './adaptive-widgets/app-shell-aw/app-shell-aw.component';
import {InputFieldAWComponent} from './adaptive-widgets/input-field-aw/input-field-aw.component';
import {FilterListAWComponent} from './adaptive-widgets/filter-list-aw/filter-list-aw.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AdaptationController, CBAUIModule} from 'cbaui';
import {NoolsRuleEngine} from './rule-evaluator/nools.rule-evaluator';
import {HandednessCP} from './context-provider/handedness-cp.service';
import {NetworkCP} from './context-provider/network-cp.service';
import {ExperienceCP} from './context-provider/experience-cp.service';
import {LocalRP} from './rule-provider/local-rp.service';
import {AmbientLightCP} from './context-provider/ambient-light-cp.service';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'search',
    component: SearchPageComponent
  },
  {
    path: 'editor',
    component: EditorPageComponent
  },
  {
    path: 'editor/:keyword',
    component: EditorPageComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SearchPageComponent,
    EditorPageComponent,
    AppShellAWComponent,
    FilterListAWComponent,
    InputFieldAWComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    CBAUIModule,
  ],
  providers: [
    HandednessCP,
    NetworkCP,
    AmbientLightCP,
    ExperienceCP,
    LocalRP,
    NoolsRuleEngine
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(aui: AdaptationController) {
    aui.registerContextProvider(HandednessCP);
    aui.registerContextProvider(NetworkCP);
    aui.registerContextProvider(AmbientLightCP);
    aui.registerContextProvider(ExperienceCP);
    aui.registerRuleProvider(LocalRP);
    aui.registerRuleEvaluator(NoolsRuleEngine);
  }
}
