import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import * as $ from 'jquery';

//import services
import { UserService } from './services/user-service/user.service';
import { ItemService } from './services/item-service/item.service';
import { LoginService } from './services/login-service/login.service';

import { MockServerResultsService } from './components/item-list/mock-server-results-service';


//import components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { LoginComponent } from './components/login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignUpComponent,
    HomeComponent,
    ItemListComponent,
    AddItemComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    FormsModule,
    NgxDatatableModule
  ],
  providers: [
  	UserService,
    ItemService,
    LoginService,
  	MockServerResultsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
