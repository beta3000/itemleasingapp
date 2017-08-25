import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login-service/login.service';
import {AppConst} from '../../utils/app-const';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private credential = {'username':'', 'password':''};

  constructor(
    private loginService: LoginService, 
    private router: Router
  ) { }

  onLogin() {
  	this.loginService.sendCredentials(this.credential.username, this.credential.password).subscribe(
  		res => {
  			console.log(res.json());
  			localStorage.setItem('currentUser', JSON.stringify({username : this.credential.username, access_token : res.json().access_token}));
  			location.assign('/home');
        // this.router.navigate(['/home']);			
  		},
  		error => {
  			console.log(error);
  		}
  	);
  }

  

  ngOnInit() {
  }

}
