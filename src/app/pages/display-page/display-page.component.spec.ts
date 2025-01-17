import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPageComponent } from './display-page.component';
import { AddressManagementService } from '../../services/address-management.service';

describe('DisplayPageComponent', () => {
  let component: DisplayPageComponent;
  let fixture: ComponentFixture<DisplayPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayPageComponent],
      providers: [AddressManagementService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
