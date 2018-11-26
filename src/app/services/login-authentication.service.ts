import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import "rxjs/add/observable/of";
import {of} from 'rxjs';

@Injectable()
export class LoginAuthenticationService {
  
  private isLoggedIn: boolean = false; 
  private loggedInRole : string;
  private authMessage : string;
  private loggedInUser : string;

  constructor(private http:HttpClient){} 
    // API: POST /UserAuthentication
    public isUserAuthenticated(userInfo) : Observable<boolean>{
      console.log("Inside isUserAuthenticated function in authentication service");
      // let headers = new HttpHeaders();
      // headers.append('Content-Type', 'application/json');
      // return this.http.post('/login/api/authentication', JSON.stringify(userInfo), { headers: headers })
      //   .map(res => {         
      //     let jsonRes= res.json();
      //     if(jsonRes.authSuccess){
      //         this.isLoggedIn = true;
      //         this.loggedInRole = jsonRes.role;
      //         this.authMessage = jsonRes.message;
      //         this.loggedInUser = jsonRes.user;
      //         return true;
      //     }else{
      //         this.isLoggedIn = false;
      //         this.authMessage = jsonRes.message;
      //         return false;
      //     }
        
      // });     
         
          //unit test
          this.isLoggedIn = true;
          if(userInfo.userId == "ABCELE1"){
               this.loggedInRole = "Shipper";
               this.authMessage = "success";
               this.loggedInUser = "ABCELE1";
               return of(true);
          } 
          if(userInfo.userId == "DHLIND"){
               this.loggedInRole = "Forwarder";
               this.authMessage = "success";
               this.loggedInUser = "DHLIND";
               return of(true);
          } else{

               this.isLoggedIn = false;
              this.authMessage = "Invalid user Id"
               return of(true);
          }
          
    }
    
    isUserLoggedIn(): boolean {
		return this.isLoggedIn;
	  }

    logoutUser(): void {
		this.isLoggedIn = false;
	}

     getLoggedInRole(): string {
     return this.loggedInRole ;

    }
  
     getAuthMessage(): string {
     return this.authMessage ;

    }
    getLoggedInUser(): string {
      return this.loggedInUser ;
 
     }

}
