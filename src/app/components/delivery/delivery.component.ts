import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from '../../interfaces/address.interface';
import { AddressManagementService } from '../../services/address-management.service';
import { numberOneNumberTwoValidator } from './numberOneNumberTwo.validator';


@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.css'
})
export class DeliveryComponent implements OnInit {

  public addressLength: number = 0;

  @Input()
  public departments: string[] = [];

  @Input()
  public cities: string[] = [];

  @Output()
  public departmentSelect: EventEmitter<string> = new EventEmitter();

  public typeStreet: string[] = [
    'Calle',
    'Carrera',
    'Avenida',
    'Transversal',
    'Circular',
    'Diagonal'
  ];

  public selectedStreet: string = '-';

  public myForm: FormGroup;

  constructor(
    private addressManagementService: AddressManagementService,
    private fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      department: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      streetNumber: ['', Validators.required],
      numberOne: [''],
      numberTwo: [''], 
      additional: ['']
    }, {
      validators: [numberOneNumberTwoValidator] 
    });    
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  emitDepartment(department: string): void {
    this.departmentSelect.emit(department);
  }

  streetSelected(street: string): void {
    this.selectedStreet = street;
  }

  saveAddres() {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;

    } else {

      const address: Address = {
        name: this.myForm.controls['name'].value,
        department: this.myForm.controls['department'].value,
        city: this.myForm.controls['city'].value,
        street: this.myForm.controls['street'].value,
        streetNumber: this.myForm.controls['streetNumber'].value,
        numberOne: this.myForm.controls['numberOne'].value,
        numberTwo: this.myForm.controls['numberTwo'].value,
        additional: this.myForm.controls['additional'].value
      }
      this.addressManagementService.addAddress(address);
      this.myForm.reset();
    }
  }


  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].invalid && this.myForm.controls[field].touched
  }


  getFieldError( field: string ): string | null {
    //Si no existe el campo coloquemos null
    if ( !this.myForm.controls[field] ) return null;

    //Tomemos el objeto de errores
    const errors = this.myForm.controls[field].errors || {};//Si es nulo se coloca un objeto

    //Sacando todas las llaves del objeto errors
    for (const key of Object.keys(errors)) {
      // console.log(key);
      switch( key ) {
        case 'required':
          return `Este campo es requerido`
      }
    }

    return 'No hay Errores';
  }
}
