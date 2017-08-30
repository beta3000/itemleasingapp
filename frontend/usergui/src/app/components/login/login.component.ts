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
  			localStorage.setItem('currentUser', JSON.stringify({username : this.credential.username, access_token : res.json().access_token, refresh_token : res.json().refresh_token, shouldSendRefreshToken : true} ));
  			location.assign('/home');
        // this.router.navigate(['/home']);

        let refreshInterval = setInterval(function(){
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          if(currentUser.shouldSendRefreshToken) {
            this.sendRefreshToken();
          } else {
             clearInterval(refreshInterval);
          }
        }, 3600 * 6);

  		},
  		error => {
  			console.log(error);
  		}
  	);
  }

  sendRefreshToken() {
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.loginService.sendRefreshToken(currentUser.refresh_token).subscribe(
        res => {
        console.log(res.json());
        localStorage.setItem('currentUser', JSON.stringify({username : this.credential.username, access_token : res.json().access_token, refresh_token : res.json().refresh_token}));
      },
      error => {
        console.log(error);
      }
     );
  }

  ngOnInit() {
  }

}
