import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from "./components/home/home.component";
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {LoginComponent} from './components/login/login.component';
import {ItemListComponent} from './components/item-list/item-list.component';
import {AddItemComponent} from './components/add-item/add-item.component';

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
		path: 'signUp',
		component: SignUpComponent
	},
	{
		path: 'signIn',
		component: LoginComponent
	},
	{
		path: 'itemList',
		component: ItemListComponent
	},
	{
		path: 'addItem',
		component: AddItemComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);