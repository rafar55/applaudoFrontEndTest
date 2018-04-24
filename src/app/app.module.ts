import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { GridComponent } from './grid/grid.component';
import { ConfigFormComponent } from './config-form/config-form.component';
import { GameService } from './Services/game.service';

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    GridComponent,
    ConfigFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [ GameService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
