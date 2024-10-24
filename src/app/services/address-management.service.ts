import { Injectable } from '@angular/core';
import { Address } from '../interfaces/address.interface';
import { Delivery } from '../interfaces/delivery.interfaces';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressManagementService {

  private address: Address[] = [
    {
      name: 'Fabio Tovio',
      department: 'Sucre',
      city: 'Sincelejo',
      street: 'Calle',
      streetNumber: '29c',
      numberOne: '21',
      numberTwo: 42,
      additional: 'Al lado de la tienda el portal'
    }
  ];
  private delivery: Delivery[] = [];

  private addressSubject = new BehaviorSubject<Address[]>(this.address);
  private deliverySubject = new BehaviorSubject<Delivery[]>(this.delivery);

  constructor() { }

  addAddress(address: Address): void {
    this.address.push( address );
    this.addressSubject.next(this.address);
  }

  deleteAddres( index: number ): void {
    this.address.splice( index, 1);
    this.addressSubject.next(this.address);
  }

  addDelivery( delivery: Delivery ): void {
    this.delivery.push( delivery );
    this.deliverySubject.next(this.delivery);
  }

  get showAddress(): Observable<string[]> {
    return this.addressSubject.asObservable().pipe(
      map(addresses => addresses.map(addr => 
        `${addr.street} ${addr.streetNumber} # ${addr.numberOne} - ${addr.numberTwo}, ${addr.additional}`)
      )
    );
  }

  get showDelivery() {
    return this.deliverySubject.asObservable();
  }

  get addressCount(): number {
    return this.address.length; 
  }

  get deliveryCount(): number {
    return this.delivery.length; 
  }

  get messageNoAddress(): boolean {
    if (this.addressCount === 0) {
      return true;
      
    } else {
      return false;
    }
  }

  get messageNoDelivery(): boolean {
    if (this.deliveryCount === 0) {
      return true;
    } else {
      return false;
    }
  }
  
  //Metodo sin observables
  // get showAddress(): string[] {
  //   return this.address.map(addr => {
      
  //     // return `Destinatario: ${addr.name}. Direccion: ${addr.city} - ${addr.department}. ${addr.street} ${addr.streetNumber} # ${addr.numberOne} - ${addr.numberTwo}, ${addr.additional}`;
  //     return `${addr.street} ${addr.streetNumber} # ${addr.numberOne} - ${addr.numberTwo}, ${addr.additional}`;
  //   });
  // }

  // get showAddresAndDate(): Delivery[] {
  //   return [...this.delivery];
  // }
}
