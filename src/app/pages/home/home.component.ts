import { Component, OnInit } from '@angular/core';
import { AddressManagementService } from '../../services/address-management.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  public addressLength: number = 0;
  public deliveryLength: number = 0;
  public showMessageBoolean: boolean = false;

  constructor( private addressManagementService: AddressManagementService ) {}
  
  ngOnInit(): void {

    // Suscribirse a la lista de direcciones
    this.addressManagementService.showAddress.subscribe(addresses => {
      this.addressLength = addresses.length; 
    });

    // Suscribirse a la lista de entregas
    this.addressManagementService.showDelivery.subscribe(deliveries => {
      this.deliveryLength = deliveries.length; 
    });
  }

  showMessage(): void {
    if ( this.addressLength === 0 ) {
      this.showMessageBoolean = true
      setTimeout( () => {
        this.showMessageBoolean = false;
      }, 3000)
    } else {
      this.showMessageBoolean = false;
    }
  }

}
