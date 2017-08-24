import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user-service/user.service';
import {AppConst} from '../../utils/app-const';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  private firstName: string;
  private lastName: string;
  private email: string;
  private username: string
  private password: string;

  constructor(
  	private userService: UserService
  	) { 
  }

  changeShowStatus(input: any): any{
    input.type = input.type === 'password' ?  'text' : 'password';
  }

  onSignUp() {
  	this.userService.createNewUser(
  		this.firstName, 
  		this.lastName, 
  		this.email, 
      this.username,
  		this.password).subscribe(
  		res => {
  			console.log(res);
  		}, 
  		error => {
  			console.log(error.text());
  		}
  	);
  }

  ngOnInit() {
  }

}
