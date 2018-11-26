import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { ShipperComponent } from './shipper/shipper.component';

import { AppRoutingModule } from './app-routing.module';
import { LoginAuthenticationService } from './services/login-authentication.service';
import { AuthGuard } from './guards/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { FileUploadService } from './services/file-upload.service';
import { ContractManagementService } from './services/contract-management.service';
import { ViewShipperContractComponent } from './view-shipper-contract/view-shipper-contract.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    ShipperComponent,
    LoginComponent,
    ViewShipperContractComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [LoginAuthenticationService,AuthGuard, FileUploadService, ContractManagementService],
  bootstrap: [AppComponent]
})
export class AppModule { }