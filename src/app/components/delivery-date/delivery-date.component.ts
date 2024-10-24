import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AddressManagementService } from '../../services/address-management.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Delivery } from '../../interfaces/delivery.interfaces';

@Component({
  selector: 'app-delivery-date',
  templateUrl: './delivery-date.component.html',
  styleUrl: './delivery-date.component.css'
})
export class DeliveryDateComponent implements OnInit {

  public deliveryLength: number = 0;
  public addressLength: number = 0;
  public address: string[] = [];

  @ViewChild('txtareaAddress')
  public textArea!: ElementRef<HTMLTextAreaElement>;

  public myForm: FormGroup;

  constructor(
    private addressManagementService: AddressManagementService,
    private fb: FormBuilder
  ) {
    this.myForm = fb.group({
      address: [{ value: '', disabled: true }, Validators.required],
      dateAndTime: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    this.addressManagementService.showDelivery.subscribe(deliveries => {
      this.deliveryLength = deliveries.length;
      this.hiddenMessage();
    });

    // Suscribirse a la lista de direcciones
    this.addressManagementService.showAddress.subscribe(addresses => {
      this.addressLength = addresses.length;
      this.address = addresses;
    });
  }

  hiddenMessage() {
    setTimeout(() => {
      this.deliveryLength = 0;
    }, 2000)
  }

  deleteAddres(index: number) {
    const addressInitial: string[] = this.address;
    const deletedAddress = addressInitial[index];

    setTimeout(() => {
      // Verificar si el formulario es inválido
      if (this.myForm.controls['dateAndTime'].valid) {
        console.log('El formulario es inválido, restaurando la dirección.');

        this.myForm.get('address')?.setValue('');
        // Añadir la dirección de vuelta al servicio
        // this.addressManagementService.addAddress(deletedAddress);
        return; // Salir del método si el formulario es inválido
      }

      // Eliminar dirección si el formulario es válido
      this.addressManagementService.deleteAddres(index);
      this.myForm.get('address')?.setValue(deletedAddress);
    }, 500);
  }


  saveDelivery(): void {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    } else {
      //Habilitando para envio
      // this.myForm.get('address')?.enable();

      const newDelivery: Delivery = {
        address: this.myForm.controls['address'].value,
        dateTime: new Date(this.myForm.controls['dateAndTime'].value)
      }

      this.addressManagementService.addDelivery(newDelivery);
      console.log(newDelivery);

      //Deshabilitar textArea
      // this.myForm.get('address')?.disable();

      this.myForm.reset();
    }

  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].invalid && this.myForm.controls[field].touched
  }


  getFieldError(field: string): string | null {
    //Si no existe el campo coloquemos null
    if (!this.myForm.controls[field]) return null;

    //Tomemos el objeto de errores
    const errors = this.myForm.controls[field].errors || {};//Si es nulo se coloca un objeto

    //Sacando todas las llaves del objeto errors
    for (const key of Object.keys(errors)) {
      // console.log(key);
      switch (key) {
        case 'required':
          return `Este campo es requerido`;
      }
    }

    return 'No hay Errores';
  }
}
