import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './utils/auth.guard';

import {HomeComponent} from "./components/home/home.component";
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {LoginComponent} from './components/login/login.component';
import {ItemListComponent} from './components/item-list/item-list.component';
import {AddItemComponent} from './components/add-item/add-item.component';
import {AllItemsComponent} from './components/all-items/all-items.component';
import {ItemDetailComponent} from './components/item-detail/item-detail.component';
import {UpdateItemComponent} from './components/update-item/update-item.component';
import {ListingsComponent} from './components/listings/listings.component';
import {AddListingComponent} from './components/add-listing/add-listing.component';
import {UpdateListingComponent} from './components/update-listing/update-listing.component';
import {AllListingsComponent} from './components/all-listings/all-listings.component';
import {ListingDetailComponent} from './components/listing-detail/listing-detail.component';
import {AddLeaseComponent} from './components/add-lease/add-lease.component';
import {LeaseListComponent} from './components/lease-list/lease-list.component';

const appRoutes: Routes = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	},
	{
		path: 'home',
		component: HomeComponent
	},
	{
		path: 'allItems',
		component: AllItemsComponent
	},
	{
		path: 'signUp',
		component: SignUpComponent
	},
	{
		path: 'signIn',
		component: LoginComponent
	},
	{
		path: 'itemList',
		component: ItemListComponent, canActivate: [AuthGuard]
	},
	{
		path: 'itemDetail/:id',
		component: ItemDetailComponent, canActivate: [AuthGuard]
	},
	{
		path: 'addItem',
		component: AddItemComponent, canActivate: [AuthGuard]
	},
	{
		path: 'updateItem/:id',
		component: UpdateItemComponent, canActivate: [AuthGuard]
	},
	{
		path: 'listings',
		component: ListingsComponent, canActivate: [AuthGuard]
	},
	{
		path: 'addListing',
		component: AddListingComponent, canActivate: [AuthGuard]
	},
	{
		path: 'updateListing/:id',
		component: UpdateListingComponent, canActivate: [AuthGuard]
	},
	{
		path: 'allListings',
		component: AllListingsComponent
	},
	{
		path: 'listingDetail/:id',
		component: ListingDetailComponent
	},
	{
		path: 'addLease/:id', 
		component: AddLeaseComponent, canActivate: [AuthGuard]
	},
	{
		path: 'leases',
		component: LeaseListComponent, canActivate: [AuthGuard]
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);