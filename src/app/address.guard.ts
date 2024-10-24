import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AddressManagementService } from './services/address-management.service';

export const addressGuard: CanActivateFn = (route) => {
  const router = inject(Router); 
  const addressService = inject(AddressManagementService); 

  const hasAddresses = addressService.addressCount > 0; 
  if (!hasAddresses) {
    router.navigate(['']); 
    return false; 
  }
  return true; 
};
