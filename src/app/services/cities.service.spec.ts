import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CitiesService } from './cities.service';

describe('CitiesService', () => {
  let service: CitiesService;
  let httpTestingController: HttpTestingController;

  const mockDepartments: any[] = [
    { id: 1, name: 'Department 1' }
  ];

  const mockCities: any[] = [
    { name: 'City 1' },
    { name: 'City 2' },
  ];

  const departmentId = 1; // ID del departamento que usepara el test

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CitiesService],
    });

    service = TestBed.inject(CitiesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should get departments', () => {
    service.getDepartment().subscribe(departments => {
      expect(departments.length).toBe(1);
      expect(departments[0].name).toBe('Department 1');
    });

    const req = httpTestingController.expectOne('https://api-colombia.com/api/v1/Department');
    expect(req.request.method).toBe('GET');
    req.flush(mockDepartments); 
  });

  it('should get cities for a given department', () => {
    service.getCities(departmentId).subscribe(cities => {
      expect(cities.length).toBe(2); 
      expect(cities).toEqual(['City 1', 'City 2']); 
    });

    const req = httpTestingController.expectOne(`https://api-colombia.com/api/v1/Department/${departmentId}/cities`);
    expect(req.request.method).toBe('GET'); 
    req.flush(mockCities); 
  });
});
