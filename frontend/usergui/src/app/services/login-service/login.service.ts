import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {AppConst} from '../../utils/app-const';

@Injectable()
export class LoginService {

  private authServerPath: string = AppConst.authServerPath;

  constructor(private http:Http) { }

  sendCredentials(username: string, password: string) {
  	let url = this.authServerPath+'/oauth/token';
  	let appName="eagleeye";
  	let appKey="thisissecret";

  	let encodedAppKey = btoa(appName+":"+appKey);
  	let basicHeader = "Basic "+encodedAppKey;
  	let headers = new Headers({
  		'Content-Type' : 'application/x-www-form-urlencoded',
  		'Authorization' : basicHeader
  	});

  	let options    = new RequestOptions({ headers: headers });

  	let userInfo = "grant_type=password&scope=webclient&username="+username+"&password="+password;

  	return this.http.post(url, userInfo, options);
  }

}
