import {ShipperComponent  } from "./shipper/shipper.component";
import { ViewShipperContractComponent } from "./view-shipper-contract/view-shipper-contract.component";
import {LoginComponent} from "./login/login.component";
import {NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './guards/auth-guard.service';

const routes: Routes = [
  { path: 'ShipperContract', component: ShipperComponent,canActivate: [AuthGuard] },
  { path: 'ViewShipperContract/:id', component: ViewShipperContractComponent,canActivate: [AuthGuard] },

  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login',pathMatch:'full'},
  { path: '**', pathMatch:'full', redirectTo: '/login'}
] 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }