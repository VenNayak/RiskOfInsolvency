import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { ActivatedRoute, Params , Router} from '@angular/router'; 
import { Location } from '@angular/common';
import { ForwarderToCarrierContract,Consignment,BillOfLading, ShipperToForwarderContract} from '../models/consignment';

import { ContractManagementService } from '../services/contract-management.service';
import { FileUploadService } from '../services/file-upload.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-forwarder',
  templateUrl: './forwarder.component.html',
  styleUrls: ['./forwarder.component.css']
})
export class ForwarderComponent implements OnInit {

  private contractName : string = "Upload Contract";
   private dsName :string = "Upload digital signature";
   private contractForm: FormGroup;
   private contractFiles: Array<File> = [];
   private dsFiles: Array<File> = [];
   private enableUploadButton : boolean = false;
   private contract : ForwarderToCarrierContract;
   private submitSuccess : boolean =false;
   private contractUploadSucess : boolean = false;
   private contractUplloadMsg : string;
   private contractId : string;
   private view : string = "contract";

   private noSearchResultsBOL : boolean = false;
   private fetchCompleteBOL : boolean = true;

   private noSearchResultsShipping : boolean = false;
   private fetchCompleteShipping : boolean = true;


   private billOfLadingList : Array<BillOfLading> = [] ;
   private shipperToForwarderContracts : Array<ShipperToForwarderContract> = [] ;

   private forwarderId = "DHLIND";
   private forwarderName = "DHL India";

  constructor(private formBuilder: FormBuilder, private router : Router, 
    private route : ActivatedRoute, private location : Location, 
    private contractManagementService :ContractManagementService, 
    private fileUploadService : FileUploadService, private modalService: NgbModal) {       
          this.route.params.subscribe( params => {
             console.log("Inside the route params Forwarder component" + JSON.stringify(params));
                 if(params.view == "bol"){
                     this.view = "bol";
                 }
                 else if(params.view == "shipping"){
                     this.view = "shipping";
                 }
                 else{
                     this.view = "contract";
                 }
              
          });
     }
 


 ngOnInit() {
  this.createForm();
  this.refreshBillOfLadings();
  this.refreshShippingContracts();
  }

  contractFileChange(event) {
      this.contractFiles= <Array<File>>event.target.files;
      if(this.contractFiles.length > 0)
       this.contractName = this.contractFiles[0].name;
       else
       this.contractName = "Upload Contract";
       this.enableUploadButton=true;
}

  dsFileChange(event) {
    this.dsFiles = <Array<File>>event.target.files;
    if(this.dsFiles.length > 0)
      this.dsName = this.dsFiles[0].name;
      else this.dsName = "Upload digital signature";
}

uploadContractWithDS(sysAlert){
  let formData:FormData = new FormData();
          formData.append('contractFile', this.contractFiles[0], this.contractFiles[0].name);
          formData.append('dsFile', this.dsFiles[0], this.dsFiles[0].name);
          this.fileUploadService.uploadFiles(formData).subscribe(
            response => {
                console.log("res received file upload service" + JSON.stringify(response));
                  if (response !=null) {
                  this.contractUplloadMsg = "Contract has been uploaded and ready for approval !"
                  this.contractUploadSucess = true;
                  this.modalService.open(sysAlert);
                  return true;
                  }
            },
            error => {
                          console.error("Error uploading file! " + JSON.stringify(error));
                          this.contractUplloadMsg = "Contract upload has failed ! Please try again later."
                          this.modalService.open(sysAlert);
              
                  }
      );

}

createForm(){
  this.submitSuccess =false;
  this.dsFiles=[];
  this.contractFiles=[];
  this.contractName = "Upload Contract";
  this.dsName = "Upload digital signature";

  this.contractForm = this.formBuilder.group({
        forwarderToCarrierContract : this.formBuilder.group({
              forwarderName : this.forwarderName,
              forwarderId :this.forwarderId,
              carrierName : '',
              carrierId : '',
              paymentType : ''
        }),
        goods: this.formBuilder.group({
            goodsId: '',
            goodsType: '',
            label: '',
            quantity: '',
            mfgDate: '',
            payAmount : ''
        })

      });

}

  submitcontract(){
    this.contractManagementService.createForwarderToCarrierContract(this.contract).subscribe(
          response => {
              console.log("res received create contract service" + JSON.stringify(response));
                if (response !=null && response.success==true) {
                   console.log("Inside submit contract success");
                  this.submitSuccess = true;
                  this.contractId =  response.contractId;
                  this.modalService.dismissAll("approved");
                  return true;
                }
          },
                error => {
                        console.error("Error creating contract ! " + JSON.stringify(error));
                        this.modalService.dismissAll("failed");
                        
                }
    );
  }

    refreshBillOfLadings(){
        this.contractManagementService.getBillOfLadings(this.forwarderId, "Forwarder").subscribe(
              response => {
                  console.log("res received getBillOfLadings service call" + JSON.stringify(response));
                    if (response !=null && response.success==true) {
                      console.log("Inside getBillOfLadings success");
                      this.fetchCompleteBOL = true;
                      if(response && response.bolList && response.bolList.length > 0 ){
                          this.billOfLadingList = response.bolList;
                          this.noSearchResultsBOL = false;
                      }else{
                          this.billOfLadingList=[];
                          this.noSearchResultsBOL = true;
                      }
                      return true;
                    }
              },
                    error => {
                            console.error("Error getting shipper to BOL list details! " + JSON.stringify(error));
                                        
                    }
        );

   }


   refreshShippingContracts(){
        this.contractManagementService.getShipperToForwarderContracts(this.forwarderId, "Forwarder").subscribe(
                    response => {
                        console.log("res received getShipperToForwarderContracts service call" + JSON.stringify(response));
                          if (response !=null && response.success==true) {
                            console.log("Inside getShipperToForwarderContracts calls success");
                            this.fetchCompleteShipping = true;
                            if(response && response.contracts && response.contracts.length > 0 ){
                                this.shipperToForwarderContracts = response.contracts;
                                this.noSearchResultsShipping = false;
                            }else{
                                this.shipperToForwarderContracts=[];
                                this.noSearchResultsShipping = true;
                            }
                            return true;
                          }
                    },
                          error => {
                                  console.error("Error getting Shipper to Forwarder Contracts list! " + JSON.stringify(error));
                                              
                          }
              );


   }

}