import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Goods ,ShipperToForwarderContract, ForwarderToCarrierContract,BillOfLading, Consignment } from '../models/consignment'
import {of} from "rxjs";

@Injectable()
export class ContractManagementService {

  constructor(private http: HttpClient) { }
        
  private httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

   // API: POST /ShipperToForwarderContract
  public createShipperToForwarderContract(shippertoForwarderContract:ShipperToForwarderContract): Observable<any>{
      console.log("Inside createShipperToForwarderContract service");
     // return this.http.post('/manageContracts/api/createShipperToForwarderContract',JSON.stringify(shippertoForwarderContract),this.httpOptions); 
      
      //unit testing
       return  of({"status" : "200", "success" : true,"msg" : "successful" ,"contractId" : "ABC123"});
  }

   // API: POST /ForwarderToCarrierContract
 public createForwarderToCarrierContract(forwarderToCarrierContract:ForwarderToCarrierContract): Observable<any>{
      console.log("Inside createForwarderToCarrierContract service");
     // return this.http.post('/manageContracts/api/createForwarderToCarrierContract',JSON.stringify(forwarderToCarrierContract),this.httpOptions); 
      
      //unit testing
       return  of({"status" : "200", "success" : true,"msg" : "successful" ,"contractId" : "FWC123"});
  }


   // API: GET/ shipperId or forwarderId
  public getShipperToForwarderContracts(Id : string, role :string) : Observable<any>{
      console.log("Inside getShipperToForwarderContracts service");
     
      //  return this.http.get('/manageContracts/api/getShipperToForwarderContracts/'+Id+'/'+role) ;
     
     //unit testing
      let mockContract =new Array<ShipperToForwarderContract>(); 
           mockContract[0] = new ShipperToForwarderContract();
           mockContract[0].contractId = "ABC123";
           mockContract[0].shipperId = "ABCELE1";
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

   // API : GET/ contract ID
  public getForwarderToCarrierContractDetails(contractId : string) : Observable<any>{
     console.log("Inside getForwarderToCarrierContractDetails service");
    //return this.http.get('/manageContracts/api/getShipperToForwarderContractDetails/'+contractId) ;
    let mockContract  = new ForwarderToCarrierContract();
           mockContract.contractId = "FWC123";
           mockContract.forwarderId = "DHLIND";
           mockContract.forwarderName = "DHL India";
           mockContract.paymentType = "PREPAID";
           mockContract.carrierId = "PEGAIND";
           mockContract.carrierName = "PEGASUS India";
      

           mockContract.goods = new Goods();
           mockContract.goods.goodsId = "G123";
           mockContract.goods.goodsType = "Electronics";
           mockContract.goods.mfgDate = "10/02/2018";
           mockContract.goods.quantity = 20;
           mockContract.goods.label = "Audio Players";
           mockContract.payAmount = 150;
        

          let mockResponse = {"status" : "200", "success" : true,"msg" : "successful" ,"contract" : mockContract};
        return  of(mockResponse); 
  }

   // API : GET/ bolId
  public getBillOfLadingDetails(bolId : string) : Observable<any>{
     console.log("Inside getBillOfLadingDetails service");
    //return this.http.get('/manageContracts/api/getBillOfLadingDetails/'+bolId) ;
    let mockBOL  = new BillOfLading();
           mockBOL.billOFLadingId = "BOL123";
           mockBOL.forwarderId = "DHLIND";
           mockBOL.shipperId = "ABCELE1";
           mockBOL.carrierAmount = 150;
           mockBOL.forwarderAmount = 108;
           mockBOL.goods = new Goods();
           mockBOL.goods.goodsId = "G123";
           mockBOL.goods.goodsType = "Electronics";
           mockBOL.goods.mfgDate = "10/02/2018";
           mockBOL.goods.quantity = 20;
           mockBOL.goods.label = "Audio Players";
        

          let mockResponse = {"status" : "200", "success" : true,"msg" : "successful" ,"bol" : mockBOL};
        return  of(mockResponse); 
  }


   // API: POST /
  public updateForwarderApprovalForShipperContract(contractId:string, forwarderApproved : string) : Observable<any>{
    console.log("Inside updateShipperApprovalStatus service");
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let approval = {"contractId" : contractId, "forwarderApproved" :forwarderApproved} ;
    // return this.http.post('/manageLandRecords/api/updateForwarderApprovalForShipperContract', JSON.stringify(approval), { headers: headers }); 
          //unit testing
       return  of({"status" : "200", "success" : true,"msg" : "successful" ,"contractId" : "ABC123"});  
  }

     // API: POST /
  public updateForwarderApprovalForBOL(bolId:string, forwarderApproved : string) : Observable<any>{
    console.log("Inside updateForwarderApprovalForBOL service");
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let approval = {"bolId" : bolId, "forwarderApproved" :forwarderApproved} ;
    // return this.http.post('/manageLandRecords/api/updateForwarderApprovalForBOL', JSON.stringify(approval), { headers: headers }); 
          //unit testing
       return  of({"status" : "200", "success" : true,"msg" : "successful" ,"bolId" : "BOL123"});  
  }

       // API: POST /
  public updateShipperApprovalForBOL(bolId:string, shipperApproved : string) : Observable<any>{
    console.log("Inside updateShipperApprovalForBOL service");
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let approval = {"bolId" : bolId, "forwarderApproved" :shipperApproved} ;
    // return this.http.post('/manageLandRecords/api/updateShipperApprovalForBOL', JSON.stringify(approval), { headers: headers }); 
          //unit testing
       return  of({"status" : "200", "success" : true,"msg" : "successful" ,"bolId" : "BOL123"});  
  }


   // API: GET/ shipperId or forwarderId
  public getBillOfLadings(Id : string, role :string) : Observable<any>{
      console.log("Inside getBillOfLadings service");
      //  return this.http.get('/manageContracts/api/getBillOfLadings/'+Id+'/'+role) ;
     
     //unit testing
      let mockBOL =new Array<BillOfLading>(); 
      mockBOL[0] = new BillOfLading();
      mockBOL[0].billOFLadingId = "BOL123";
      mockBOL[0].carrierAmount = 150;
      mockBOL[0].forwarderId = "DHLIND";
      mockBOL[0].carrierId = "PEGAIND";
      mockBOL[0].paymentType = "PREPAID";
      mockBOL[0].forwarderAmount = 108;
      mockBOL[0].shipperId = "ABCELE1";
           mockBOL[0].goods = new Goods();
           mockBOL[0].goods.goodsId = "G123";
           mockBOL[0].goods.goodsType = "Electronics";
           mockBOL[0].goods.mfgDate = "10/02/2018";
           mockBOL[0].goods.quantity = 20;
           mockBOL[0].goods.label = "Audio Players";
           

      let mockResponse = {"status" : "200", "success" : true,"msg" : "successful" ,"bolList" : mockBOL};
       return  of(mockResponse);
  }



  
}