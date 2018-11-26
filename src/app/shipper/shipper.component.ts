import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { ActivatedRoute, Params , Router} from '@angular/router'; 
import { Location } from '@angular/common';
import {ShipperToForwarderContract, Consignment} from '../models/consignment';

import { ContractManagementService } from '../services/contract-management.service';
import { FileUploadService } from '../services/file-upload.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shipper',
  templateUrl: './shipper.component.html',
  styleUrls: ['./shipper.component.css']
})
export class ShipperComponent implements OnInit {

   private contractName : string = "Upload Contract";
   private dsName :string = "Upload digital signature";
   private contractForm: FormGroup;
   private contractFiles: Array<File> = [];
   private dsFiles: Array<File> = [];
   private enableUploadButton : boolean = false;
   private consignment : Consignment;
   private submitSuccess : boolean =false;
   private contractUploadSucess : boolean = false;
   private contractUplloadMsg : string;
   private contractId : string;

   private noSearchResults : boolean = false;
   private fetchComplete : boolean = true;
   private shipperToForwarderContract : Array<ShipperToForwarderContract> = [] ;

   private shipperId = "ABCELE1";
   private shipperName = "ABC electricals";

  constructor(private formBuilder: FormBuilder, private router : Router, 
    private route : ActivatedRoute, private location : Location, 
    private contractManagementService :ContractManagementService, 
    private fileUploadService : FileUploadService, private modalService: NgbModal) { }
 


 ngOnInit() {
  this.createForm();
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
        goods: this.formBuilder.group({
            goodsId: '',
            goodsType: '',
            label: '',
            quantity: '',
            mfgDate: '',
            payAmount : ''
        }),
        shipperToForwarderContract : this.formBuilder.group({
              shipperId : this.shipperId,
              shipperName :this.shipperName,
              forwarderId : '',
              forwarderName : ''
        })
      });

}

  submitcontract(){
    this.contractManagementService.createShipperToForwarderContract(this.consignment).subscribe(
          response => {
              console.log("res received create contrct service" + JSON.stringify(response));
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

  refreshPayments(){
    this.contractManagementService.getShipperToForwarderContracts(this.shipperId).subscribe(
          response => {
              console.log("res received getShipperToForwarderContracts service call" + JSON.stringify(response));
                if (response !=null && response.success==true) {
                   console.log("Inside get shipper to forwarder contracts success");
                  this.fetchComplete = true;
                  if(response && response.contracts && response.contracts.length > 0 ){
                      this.shipperToForwarderContract = response.contracts;
                      this.noSearchResults = false;
                  }else{
                      this.shipperToForwarderContract=[];
                      this.noSearchResults = true;
                  }
                  return true;
                }
          },
                error => {
                        console.error("Error getting shipper to forwarder contract details! " + JSON.stringify(error));
            
                        
                }
    );


  }


  

}