import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsPageComponent } from './forms-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CitiesService } from '../../services/cities.service';
import { DepartmentWithIndex } from '../../interfaces/department.interface';
import { of } from 'rxjs';

const deparmentsWithIndex: DepartmentWithIndex[] = [
  {
    id: 0,
    name: 'Sucre'
  }
];


const cities: string[] = [
  'Sincelejo'
]

describe('FormsPageComponent', () => {
  let component: FormsPageComponent;
  let fixture: ComponentFixture<FormsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormsPageComponent],
      imports: [HttpClientTestingModule],
      providers: [CitiesService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //   searchCities( departmentSelect: string ) {

  //     //Buscando el indice
  //     let department = this.deparmentsWithIndex.find(department => department.name === departmentSelect);

  //     if ( department ) {
  //       const id = department.id;
  //       this.citiesService.getCities( id ).subscribe(
  //         value => this.cities = value

  //     )
  //   }
  // }

  it('searchCities', () => {
    //Creando el servicio
    const citiesService = fixture.debugElement.injector.get(CitiesService);
    const department: string = 'Sucre';

    //Asignar valor al componente
    component.deparmentsInfo = deparmentsWithIndex;
 
    //Creando el espia del servicio
    const spy2 = jest.spyOn(citiesService, 'getCities').mockReturnValueOnce( of(cities));
    
    //Llamada al metodo
    component.searchCities( department );

    //Validaciones
    // expect( spy1 ).toHaveBeenCalledTimes(1);
    expect( spy2 ).toHaveBeenCalledTimes(1);

  });

});
