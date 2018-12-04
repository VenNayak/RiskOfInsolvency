import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {LoginAuthenticationService } from '../services/login-authentication.service';
import { Router} from '@angular/router';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: any = {};
  loading = false;
  authMessage : string;

  constructor(private loginAuthService : LoginAuthenticationService, private router: Router) {}

  ngOnInit() {

  }

  ngOnDestroy() {
  }
  onSubmit(userlogin : NgForm){
    if(userlogin.valid){
        this.loading = true; // validation in progress
        console.log("Form values :" + JSON.stringify(this.login));
        let user = {"userId" : this.login.username, "password" : this.login.password};
        //check for user authentication
        this.loginAuthService.isUserAuthenticated (user)
        .subscribe(
        authenticated => {
            this.loading=false;
            console.log("res received authentication service :" + authenticated);
            if (authenticated) {
              this.authMessage=null;
              //if auth success route according to the role
              console.log("logged in role :" + this.loginAuthService.getLoggedInRole());
              if(this.loginAuthService.getLoggedInRole() == "Shipper"){
                console.log("inside shipper logged in role");
                this.router.navigateByUrl('/ShipperContract');
              }
              else if(this.loginAuthService.getLoggedInRole() == "Forwarder"){
                console.log("Inside Forwarder logged in role");
                this.router.navigateByUrl('/CarrierContract');
              }        
              else if(this.loginAuthService.getLoggedInRole() == "Carrier"){
                console.log("Inside Carrier logged in role");
                this.router.navigateByUrl('/BillOfLading');
              }    
            }else{
                this.authMessage = this.loginAuthService.getAuthMessage();
            }
         });
     }else{
        if((this.login.username ==null || this.login.username =="")  && (this.login.password ==null || this.login.password == "")){
          this.authMessage = "Username & password are required !"
        }
        else if(this.login.username ==null || this.login.username == ""){
            this.authMessage = "Username is required !"
        }
        else if(this.login.password == null || this.login.password == ""){
          this.authMessage = "Password is required !";
        }
     }
  }

}
