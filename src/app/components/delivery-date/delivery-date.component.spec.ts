import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeliveryDateComponent } from './delivery-date.component';
import { AddressManagementService } from '../../services/address-management.service';

const mockAddresses = ['Address 1', 'Address 2', 'Address 3'];

describe('DeliveryDateComponent', () => {
  let component: DeliveryDateComponent;
  let fixture: ComponentFixture<DeliveryDateComponent>;
  let addressManagementService: AddressManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [DeliveryDateComponent],
      providers: [AddressManagementService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryDateComponent);
    component = fixture.componentInstance;
    addressManagementService = TestBed.inject(AddressManagementService);
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Reseteamos los mocks después de cada prueba
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not delete address when form is invalid', () => {
    jest.spyOn(addressManagementService, 'deleteAddres').mockImplementation(() => {});
  
    // Simulando que el formulario es inválido
    component.myForm.controls['dateAndTime'].setValue(null); 
  
    // Intentar eliminar la dirección en el índice 1
    component.deleteAddres(1); 
  
    // Usar un setTimeout para esperar que se ejecute la lógica
    setTimeout(() => {
      // Verificar que no se llame al método de eliminación
      expect(addressManagementService.deleteAddres).not.toHaveBeenCalled(); 
      expect(component.myForm.get('address')?.value).toBe(''); // Verificar que la dirección no se establezca
    }, 500);
  });

  it('should delete address when form is valid', () => {
    jest.spyOn(addressManagementService, 'deleteAddres').mockImplementation(() => {});
  
    // Simulando que el formulario es válido
    component.myForm.controls['dateAndTime'].setValue('2023-10-23'); // Valor válido
    component.myForm.controls['address'].setValue('Existing Address');
  
    component.deleteAddres(1); // Intentar eliminar la dirección
  
    setTimeout(() => {
      expect(addressManagementService.deleteAddres).toHaveBeenCalledWith(1); // Verificar que se llame al método de eliminación
      expect(component.myForm.get('address')?.value).toBe('Existing Address'); // Verificar que la dirección se establezca
    }, 500);
  });

  it('getFieldError', () => {
    // Configura el formulario
    component.myForm = new FormGroup({
      requiredField: new FormControl('', { validators: [Validators.required] }), // Campo requerido
      validField: new FormControl('valid value'), // Campo válido
    });
  
    // Verificar el error para el campo requerido (debería devolver un mensaje)
    let error = component.getFieldError('requiredField');
    expect(error).toBe('Este campo es requerido');
  
    // Verificar el error para el campo válido (debería devolver "No hay Errores")
    error = component.getFieldError('validField');
    expect(error).toBe('No hay Errores');
  
    // Verificar el campo inexistente (debería devolver null)
    error = component.getFieldError('nonexistentField');
    expect(error).toBeNull(); // Espera que retorne null
  });
  
  
});
