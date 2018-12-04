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
    forwarderApproved : string;
    shipperPaid : boolean;
    constructor() {
      this.shipperPaid = false;
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
    forwarderApproved : string;
    carrierApproved : string;
    paymentType: string;
    constructor() {
            this.paymentType = "PREPAID";
     }
  
  }
  
  export class BillOfLading {
    billData : string;
    billOFLadingId : string;
    carrierAmount : number;
    forwarderAmount : number;
    forwarderId : string;
    carrierId : string;
    shipperId : string;
    timestamp : string;
    paymentType : string;
    goods : Goods;
    constructor() { 
        this.paymentType = "PREPAID";
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
