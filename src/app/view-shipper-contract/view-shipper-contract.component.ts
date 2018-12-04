import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { ActivatedRoute, Params , Router} from '@angular/router'; 
import { DomSanitizer} from "@angular/platform-browser";
import { Location } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ContractManagementService } from '../services/contract-management.service';
import { FileUploadService } from '../services/file-upload.service';
import {ShipperToForwarderContract, Consignment} from '../models/consignment';
import 'rxjs/add/operator/switchMap'; 

@Component({
  selector: 'app-view-shipper-contract',
  templateUrl: './view-shipper-contract.component.html',
  styleUrls: ['./view-shipper-contract.component.css']
})
export class ViewShipperContractComponent implements OnInit {
   
  private contractData : string;
  private shipperVerified : boolean = false;
  private shipperVerificationSuccess : boolean = false;
  private dsFiles: Array<File> = [];
  private dsName : string = "Upload digital signature";
  private contractForm: FormGroup;
  private approvalMsg : string;
  private pdfURl:any;

  constructor(private formBuilder: FormBuilder, private router : Router, 
    private route : ActivatedRoute, private location : Location, 
    private contractManagementService :ContractManagementService, 
    private fileUploadService : FileUploadService,private domSanitizer : DomSanitizer,private modalService: NgbModal) { }

  ngOnInit() {
     this.shipperVerified=false;
     this.shipperVerificationSuccess=false;
     this.createForm();
     this.getContractDetails();

  }

  createForm(){


  this.contractForm = this.formBuilder.group({
        goods: this.formBuilder.group({
            goodsId: '',
            goodsType: '',
            label: '',
            quantity: '',
            mfgDate: '',
            payAmount : ''
        }),
        shipperToForwarderContract : this.formBuilder.group({
              contractId : '',
              shipperId : '',
              shipperName :'',
              forwarderId : '',
              forwarderName : ''
        })
      });

}


formAction(action:string, modal){
   let contractId = this.contractForm.get('shipperToForwarderContract.contractId').value;
   console.log("contract ID retrieved from field:"+contractId);
   let fwApproveStatus = "";
   if(action == "approve"){
     this.approvalMsg = "The contract has been approved successfully !"
     fwApproveStatus = "Y";
   }else{
     this.approvalMsg = "The contract has been rejected !"
     fwApproveStatus = "N";
   }
   this.contractManagementService.updateForwarderApprovalForShipperContract(contractId,fwApproveStatus).subscribe(
             response => {
              console.log("res received updateForwarderApprovalForShipperContract service" + JSON.stringify(response));
                if (response !=null && response.success) {
                    this.modalService.open(modal);
                    return true;
                }
          },
           error => {
                        console.error("Error in updateForwarderApprovalForShipperContract service all " + JSON.stringify(error));
                        this.approvalMsg = "An error occureed while updating the status ! Please try again later"
                        this.modalService.open(modal);
            
                }
   );
   

}


verifySignature(){
  let formData:FormData = new FormData();
  formData.append('dsFile', this.dsFiles[0], this.dsFiles[0].name);
  this.fileUploadService.verifyDSFile(formData).subscribe(
          response => {
              console.log("res received verifyDSFile service" + JSON.stringify(response));
               this.shipperVerified = true;
                if (response !=null && response.success) {
                  this.shipperVerificationSuccess = true;
                  this.contractData = response.data;
                  this.pdfURl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.contractData);
                return true;
                }
          },
           error => {
                        console.error("Error verifying ds file! " + JSON.stringify(error));
            
                }
    );
   

}

dsFileChange(event) {
    this.dsFiles = <Array<File>>event.target.files;
    if(this.dsFiles.length > 0)
      this.dsName = this.dsFiles[0].name;
      else this.dsName = "Upload digital signature";
}

goBack(){
    this.modalService.dismissAll();
    this.router.navigate(['ShipperContract', 'payments']);

  }

getContractDetails(){
        this.route.params
          .switchMap((params: Params) => this.contractManagementService.getShipperToForwarderContractDetails(params['id']))
          .subscribe(
            response => {
              if(response && response.contract){
              let contractData = <ShipperToForwarderContract>response.contract;
              console.log("Res received from getContractDetails calls" + JSON.stringify(contractData));
               this.contractForm.patchValue({"goods" : { 
                                "goodsId": contractData.goods.goodsId,
                                "goodsType": contractData.goods.goodsType,
                                "label": contractData.goods.label,
                                "quantity": contractData.goods.quantity,
                                "mfgDate": contractData.goods.mfgDate,
                                "payAmount" : contractData.payAmount
               }});

               this.contractForm.patchValue({"shipperToForwarderContract" : { 
                                "contractId" : contractData.contractId,
                                "shipperId": contractData.shipperId,
                                "shipperName": contractData.shipperName,
                                "forwarderId": contractData.forwarderId,
                                "forwarderName": contractData.forwarderName                            
               }});
            }
            },
            error =>{
                     console.log("Error in calling getShipperToForwarderContractDetails"+ JSON.stringify(error));
            }

          );
}





}