import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login-service/login.service';
import {AppConst} from '../../utils/app-const';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private credential = {'username':'', 'password':''};

  constructor(private loginService: LoginService) { }

  onLogin() {
  	this.loginService.sendCredentials(this.credential.username, this.credential.password).subscribe(
  		res => {
  			console.log(res.json());
  			localStorage.setItem('currentUser', JSON.stringify({username : this.credential.username, access_token : res.json().access_token}));
  			location.reload();			
  		},
  		error => {
  			console.log(error);
  		}
  	);
  }

  onLogout(): void {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('currentUser');
  }

  ngOnInit() {
  }

}
