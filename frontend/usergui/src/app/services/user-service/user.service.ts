import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {User} from '../../models/user';
import {AppConst} from '../../utils/app-const';

@Injectable()
export class UserService {
  private userServicePath: string = AppConst.userServicePath;

  constructor(private http:Http) { 
  }

  createNewUser(
  	firstName: string,
  	lastName: string,
  	email: string,
  	password: string
  ) {
  	let url = this.userServicePath + '/user';
  	let userInfo = {
  		"firstName" : firstName,
  		"lastName" : lastName,
  		"email" : email,
  		"password" : password
  	}
  	let header = new Headers({
      'Content-Type' : 'application/json'
    });

  	return this.http.post(url, JSON.stringify(userInfo), {headers: header});
  }

}
