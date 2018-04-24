import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { GridComponent } from './grid/grid.component';
import { ConfigFormComponent } from './config-form/config-form.component';


@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    GridComponent,
    ConfigFormComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
