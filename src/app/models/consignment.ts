export class ShipperToForwarderContract {
    contractData : string;
    contractId : string;
    payAmount : number;
    timestamp : string;
    forwarderName :string;
    forwarderId : string;
    shipperName : string;
    shipperId : string;
    goods : Goods;
    forwarderApproved : boolean;
    shipperPaid : boolean;
    constructor() {
      this.shipperPaid = false;
      this.forwarderApproved = false;

     }
  
  }

  export class ForwarderToCarrierContract {
    contractData : string;
    contractId : string;
    payAmount : number;
    timestamp : string;
    carrierId : string;
    carrierName : string;
    forwarderName :string;
    forwarderId : string;
    goods : Goods;
    forwarderApproved : boolean;
    carrierApproved : boolean;
    constructor() {
     this.forwarderApproved = false;
      this.carrierApproved = false;

     }
  
  }
  
  export class BillOfLading {
    billData : string;
    billOFLadingId : string;
    carrierAmount : number;
    forwarderAmount : number;
    forwarderId : string;
    timestamp : string;
    paymentStatus : string;
    constructor() { 
        this.paymentStatus = "PREPAID";
    }
  }
  
  export class Goods {
    goodsId: string;
    goodsType: string;
    label: string;
    quantity: number;
    mfgDate : string;
    constructor() { }
  
  }
  
  export class Consignment{
   shipperToForwarderContract : ShipperToForwarderContract;
   forwarderToCarrierContract : ForwarderToCarrierContract;
   billofLading : BillOfLading;
   constructor() { }
  }
