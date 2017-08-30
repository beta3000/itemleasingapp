import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { LoginService } from '../../services/login-service/login.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private userLoggedIn;

  constructor(private loginService: LoginService) { 
  	this.userLoggedIn = false;

  	if(this.loginService.checkLogin()) {
  		this.userLoggedIn = true;
  	}
  }

  logout(): void {
  	this.loginService.logout();
    location.assign('/signIn');
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    currentUser.shouldSendRefreshToken = false;
  }

  ngOnInit() {
  }

}
