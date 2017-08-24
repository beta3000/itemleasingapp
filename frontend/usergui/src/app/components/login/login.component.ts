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
  			console.log(res);
  		},
  		error => {
  			console.log(error);
  		}
  	);
  }

  ngOnInit() {
  }

}
