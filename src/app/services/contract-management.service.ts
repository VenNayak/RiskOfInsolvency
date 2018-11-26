import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Goods ,ShipperToForwarderContract, ForwarderToCarrierContract,Consignment } from '../models/consignment'
import {of} from "rxjs";

@Injectable()
export class ContractManagementService {

  constructor(private http: HttpClient) { }
        
  private httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

   // API: POST /consignment
  public createShipperToForwarderContract(consignment:Consignment): Observable<any>{
      console.log("Inside createShipperToForwarderContract service");
     // return this.http.post('/manageContracts/api/createShipperToForwarderContract',JSON.stringify(consignment),this.httpOptions); 
      
      //unit testing
       return  of({"status" : "200", "success" : true,"msg" : "successful" ,"contractId" : "ABC123"});
  }



   // API: GET/ shipperId
  public getShipperToForwarderContracts(shipperId : string) : Observable<any>{
      console.log("Inside getShipperToForwarderContracts service");
     
      //  return this.http.get('/manageContracts/api/getShipperToForwarderContracts/'+shipperId) ;
     
     //unit testing
      let mockContract =new Array<ShipperToForwarderContract>(); 
           mockContract[0] = new ShipperToForwarderContract();
           mockContract[0].contractId = "ABC123";
           mockContract[0].forwarderId = "DHLIND";
           mockContract[0].forwarderName = "DHL India";
           mockContract[0].goods = new Goods();
           mockContract[0].goods.goodsId = "G123";
           mockContract[0].goods.goodsType = "Electronics";
           mockContract[0].goods.mfgDate = "10/02/2018";
           mockContract[0].goods.quantity = 20;
           mockContract[0].payAmount = 258;

      
      let mockResponse = {"status" : "200", "success" : true,"msg" : "successful" ,"contracts" : mockContract};
       return  of(mockResponse);
  }

 // API : GET/ contract ID
  public getShipperToForwarderContractDetails(contractId : string) : Observable<any>{
     console.log("Inside getShipperToForwarderContractDetails service");
    //return this.http.get('/manageContracts/api/getShipperToForwarderContractDetails/'+contractId) ;
    let mockContract  = new ShipperToForwarderContract();
           mockContract.contractId = "ABC123";
           mockContract.forwarderId = "DHLIND";
           mockContract.forwarderName = "DHL India";
           mockContract.shipperName = "ABC electricals";
           mockContract.shipperId = "ABCELE1";
           mockContract.goods = new Goods();
           mockContract.goods.goodsId = "G123";
           mockContract.goods.goodsType = "Electronics";
           mockContract.goods.mfgDate = "10/02/2018";
           mockContract.goods.quantity = 20;
           mockContract.goods.label = "Audio Players";
           mockContract.payAmount = 258;
        

          let mockResponse = {"status" : "200", "success" : true,"msg" : "successful" ,"contract" : mockContract};
        return  of(mockResponse); 
  }


   // API: POST /
  public updateForwarderApprovalForShipperContract(contractId:string, forwarderApproved : string) : Observable<any>{
    console.log("Inside updateShipperApprovalStatus service");
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let approval = {"contractId" : contractId, "forwarderApproved" :forwarderApproved} ;
    // return this.http.post('/manageLandRecords/api/addLandRecordMojani', JSON.stringify(approval), { headers: headers }); 
          //unit testing
       return  of({"status" : "200", "success" : true,"msg" : "successful" ,"contractId" : "ABC123"});  
  }



  
}