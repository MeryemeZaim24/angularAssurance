import { Assure } from "./assure";

export class Contrat {

    id!: number;
    police: string;
    dateSignature: Date;
    dateExpiration: Date;
    
    assure: Assure;
  
    constructor() {
      this.police = '';
      this.dateSignature = new Date();
      this.dateExpiration = new Date();
      
      this.assure =new Assure();
    }
}
