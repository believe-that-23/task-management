import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { ViewComponent } from './components/view/view.component';
import { FormsModule } from '@angular/forms';
import { DateValueAccessorModule } from 'angular-date-value-accessor';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './components/store/task.reducer';
import { localStorageMetaReducer } from './components/store/task.localstorage.reducer';
import { LogsComponent } from './components/logs/logs.component';

const appRoutes: Routes = [
  {
    path: 'tasks', component: ViewComponent
  },
  { path: 'add-task', component: AddTaskComponent },
  { path: 'logs', component: LogsComponent},
  { path: 'not-found', component: ErrorPageComponent, data: { message: 'Page not found!' } },
  { path: '**', redirectTo: '/not-found' }
]


@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    ViewComponent,
    ErrorPageComponent,
    PageNotFoundComponent,
    LogsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DateValueAccessorModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot({ taskList: appReducer }, {metaReducers: [localStorageMetaReducer]})

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
