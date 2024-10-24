import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddressManagementService } from '../../services/address-management.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent implements OnInit {
  
  public address: string[] = [];
  
  @Input()
  public title: string = '';
  
  @Input()
  public isEditMode: boolean = false;
  
  @Output()
  public indexAddress: EventEmitter<number> = new EventEmitter();

  constructor( private addressManagementService: AddressManagementService) {}

  ngOnInit(): void {
     // Suscribirse a la lista de direcciones
     this.addressManagementService.showAddress.subscribe(addresses => {
      this.address = addresses; 
    });
  }
  
  showIndex( index: number ): void {
    this.indexAddress.emit( index );
    console.log( index );
  }
}
