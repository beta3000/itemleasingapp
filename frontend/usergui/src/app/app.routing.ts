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
		component: ItemDetailComponent
	},
	{
		path: 'addItem',
		component: AddItemComponent
	},
	{
		path: 'updateItem/:id',
		component: UpdateItemComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);