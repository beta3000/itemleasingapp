import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from "./components/home/home.component";
import {SignUpComponent} from './components/sign-up/sign-up.component';

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
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);