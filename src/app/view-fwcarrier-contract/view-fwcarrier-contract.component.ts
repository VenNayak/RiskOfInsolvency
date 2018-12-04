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
import { BillOfLading, Consignment,ForwarderToCarrierContract} from '../models/consignment';
import 'rxjs/add/operator/switchMap'; 
import {LoginAuthenticationService } from '../services/login-authentication.service';

@Component({
  selector: 'app-view-fwcarrier-contract',
  templateUrl: './view-fwcarrier-contract.component.html',
  styleUrls: ['./view-fwcarrier-contract.component.css']
})
export class ViewFWCarrierContractComponent implements OnInit {

  private bolData : string;
  private forwarderVerified : boolean = false;
  private forwarderVerificationSuccess : boolean = false;
  private dsFiles: Array<File> = [];
  private dsName : string = "Upload digital signature";
  private bolForm: FormGroup;
  private approvalMsg : string;
  private pdfURl:any;
  private currentRole : string;

  constructor(private formBuilder: FormBuilder, private router : Router, private loginAuthService : LoginAuthenticationService,
    private route : ActivatedRoute, private location : Location, 
    private contractManagementService :ContractManagementService, 
    private fileUploadService : FileUploadService,private domSanitizer : DomSanitizer,private modalService: NgbModal) {

                this.currentRole = this.loginAuthService.getLoggedInRole();
                console.log("Logged in User Role : " + this.currentRole);
     }

  ngOnInit() {
     this.forwarderVerified=false;
     this.forwarderVerificationSuccess=false;
     this.createForm();
     this.getForwarderToCarrierContract();

  }

  createForm(){
  this.bolForm = this.formBuilder.group({
        billOfLading : this.formBuilder.group({
              billOfLadingId : '',
              carrierAmount : '',
              forwarderAmount :'',
              forwarderId : '',
              shipperId : '',
              paymentType : ''
        }),
        goods: this.formBuilder.group({
            goodsId: '',
            goodsType: '',
            label: '',
            quantity: '',
            mfgDate: ''
        })
      });

}


formAction(action:string, modal){
   let billOfLadingId = this.bolForm.get('billOfLading.billOfLadingId').value;
   console.log("BOL ID retrieved from field:"+billOfLadingId);
   let fwApproveStatus = "";
   if(action == "approve"){
     this.approvalMsg = "The Bill of Lading has been approved successfully !"
     fwApproveStatus = "Y";
   }else{
     this.approvalMsg = "The Bill of Lading has been rejected !"
     fwApproveStatus = "N";
   }
   if(this.currentRole == "Shipper"){
  
   this.contractManagementService.updateShipperApprovalForBOL(billOfLadingId,fwApproveStatus).subscribe(
             response => {
              console.log("res received updateShipperApprovalForBOL service" + JSON.stringify(response));
                if (response !=null && response.success) {
                    this.modalService.open(modal);
                    return true;
                }
          },
           error => {
                        console.error("Error in updateShipperApprovalForBOL service call " + JSON.stringify(error));
                        this.approvalMsg = "An error occureed while updating the status ! Please try again later"
                        this.modalService.open(modal);
            
                }
   );

   }else if(this.currentRole == "Forwarder"){

   this.contractManagementService.updateForwarderApprovalForBOL(billOfLadingId,fwApproveStatus).subscribe(
             response => {
              console.log("res received updateForwarderApprovalForBOL service" + JSON.stringify(response));
                if (response !=null && response.success) {
                    this.modalService.open(modal);
                    return true;
                }
          },
           error => {
                        console.error("Error in updateForwarderApprovalForBOL service call " + JSON.stringify(error));
                        this.approvalMsg = "An error occureed while updating the status ! Please try again later"
                        this.modalService.open(modal);
            
                }
   );
   }

   

}


verifySignature(){
  let formData:FormData = new FormData();
  formData.append('dsFile', this.dsFiles[0], this.dsFiles[0].name);
  this.fileUploadService.verifyDSFile(formData).subscribe(
          response => {
              console.log("res received verifyDSFile service" + JSON.stringify(response));
               this.forwarderVerified = true;
                if (response !=null && response.success) {
                  this.forwarderVerificationSuccess = true;
                  this.bolData = response.data;
                  this.pdfURl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.bolData);
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
    this.router.navigate(['ShipperContract', 'bol']);

  }

getForwarderToCarrierContract(){
        this.route.params
          .switchMap((params: Params) => this.contractManagementService.getForwarderToCarrierContractDetails(params['id']))
          .subscribe(
            response => {
                if(response && response.contract){
                  let bolData = <ForwarderToCarrierContract>response.contract;
                  console.log("Res received from getContractDetails calls" + JSON.stringify(bolData));
                  this.bolForm.patchValue({"goods" : { 
                                    "goodsId": bolData.goods.goodsId,
                                    "goodsType": bolData.goods.goodsType,
                                    "label": bolData.goods.label,
                                    "quantity": bolData.goods.quantity,
                                    "mfgDate": bolData.goods.mfgDate
                  }});
                  this.bolForm.patchValue({"billOfLading" : { 
                                    "billOfLadingId" : bolData.billOFLadingId,
                                    "shipperId": bolData.shipperId,
                                    "carrierAmount": bolData.carrierAmount,
                                    "forwarderId": bolData.forwarderId,
                                    "forwarderAmount": bolData.forwarderAmount,
                                    "paymentType"  : bolData.paymentType                       
                  }});

              }
          },
          error =>{
                     console.log("Error in calling getShipperToForwarderContractDetails"+ JSON.stringify(error));
            }

          );
}

}