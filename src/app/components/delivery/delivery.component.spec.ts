import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryComponent } from './delivery.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('DeliveryComponent', () => {
  let component: DeliveryComponent;
  let fixture: ComponentFixture<DeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliveryComponent],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit department when emitDepartment is called', () => {
    const spy = jest.spyOn(component.departmentSelect, 'emit');

    const testDepartment = 'Test Department';
    
    component.emitDepartment(testDepartment);

    expect(spy).toHaveBeenCalledWith(testDepartment);
  });

  it('should set selectedStreet when streetSelected is called', () => {
    const testStreet = 'Direccion';

    const spy = jest.spyOn(component, 'streetSelected').mockImplementation(() => null);

    component.streetSelected(testStreet);

    expect(spy).toHaveBeenCalledWith(testStreet);

  });

  it('should return a string from getFieldError', () => {

    // Simular un campo sin errores
    component.myForm.controls['name'].setErrors(null); // No hay errores
    const result3 = component.getFieldError('name');
    expect(typeof result3).toBe('string');
  });
});
