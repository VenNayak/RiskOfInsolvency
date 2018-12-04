import {ShipperComponent  } from "./shipper/shipper.component";
import { ViewShipperContractComponent } from "./view-shipper-contract/view-shipper-contract.component";
import { ViewBillOfLadingComponent } from "./view-bill-of-lading/view-bill-of-lading.component";
import {LoginComponent} from "./login/login.component";
import {NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './guards/auth-guard.service';
import {CarrierComponent} from "./carrier/carrier.component";
import {ForwarderComponent} from "./forwarder/forwarder.component";

const routes: Routes = [
  { path: 'ShipperContract', component: ShipperComponent,canActivate: [AuthGuard] },
  { path: 'ShipperContract/:view', component: ShipperComponent,canActivate: [AuthGuard] },

  { path: 'ViewShipperContract/:id', component: ViewShipperContractComponent,canActivate: [AuthGuard] },
  { path: 'ViewBillOfLading/:id', component: ViewBillOfLadingComponent,canActivate: [AuthGuard] },
  
  { path: 'BillOfLading', component: CarrierComponent,canActivate: [AuthGuard] },
  { path: 'BillOfLading/:view', component: CarrierComponent,canActivate: [AuthGuard] },
  
  { path: 'CarrierContract', component: ForwarderComponent,canActivate: [AuthGuard] },
  { path: 'CarrierContract/:view', component: ForwarderComponent,canActivate: [AuthGuard] },

  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login',pathMatch:'full'},
  { path: '**', pathMatch:'full', redirectTo: '/login'}
] 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }