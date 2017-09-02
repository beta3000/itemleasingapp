import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import * as $ from 'jquery';

import { AuthGuard } from './utils/auth.guard';

//import services
import { UserService } from './services/user-service/user.service';
import { ItemService } from './services/item-service/item.service';
import { LoginService } from './services/login-service/login.service';
import { ListingService } from './services/listing-service/listing.service';
import { MockServerResultsService } from './components/item-list/mock-server-results-service';


//import components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { LoginComponent } from './components/login/login.component';
import { AllItemsComponent } from './components/all-items/all-items.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { UpdateItemComponent } from './components/update-item/update-item.component';
import { ListingsComponent } from './components/listings/listings.component';
import { AddListingComponent } from './components/add-listing/add-listing.component';
import { UpdateListingComponent } from './components/update-listing/update-listing.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignUpComponent,
    HomeComponent,
    ItemListComponent,
    AddItemComponent,
    LoginComponent,
    AllItemsComponent,
    ItemDetailComponent,
    UpdateItemComponent,
    ListingsComponent,
    AddListingComponent,
    UpdateListingComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    FormsModule,
    NgxDatatableModule,
    Ng2SmartTableModule
  ],
  providers: [
    AuthGuard,
  	UserService,
    ItemService,
    LoginService,
    ListingService,
  	MockServerResultsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
