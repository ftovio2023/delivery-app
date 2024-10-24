import { Component, OnInit } from '@angular/core';
import { AddressManagementService } from '../../services/address-management.service';
import { Delivery } from '../../interfaces/delivery.interfaces';

@Component({
  selector: 'app-display-page',
  templateUrl: './display-page.component.html',
  styleUrl: './display-page.component.css'
})
export class DisplayPageComponent implements OnInit {

  public addressLength: number = 0;
  public deliveryLength: number = 0;
  public delivery: Delivery[] = [];

  constructor( private addressManagementService: AddressManagementService) {}
  
  ngOnInit(): void {

    // Suscribirse a la lista de direcciones
    this.addressManagementService.showAddress.subscribe(addresses => {
      this.addressLength = addresses.length; 
    });

    // Suscribirse a la lista de entregas
    this.addressManagementService.showDelivery.subscribe(deliveries => {
      this.deliveryLength = deliveries.length; 
    });

    // Suscribirse a la lista de envios
    this.addressManagementService.showDelivery.subscribe(deliveries => {
      this.delivery = deliveries; 
    });
  }
}
