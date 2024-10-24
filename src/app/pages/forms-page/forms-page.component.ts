import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../../services/cities.service';
import { InfoDepartment } from '../../interfaces/department.interface';

@Component({
  selector: 'app-forms-page',
  templateUrl: './forms-page.component.html',
  styleUrl: './forms-page.component.css'
})
export class FormsPageComponent implements OnInit {

  public deparmentsInfo: InfoDepartment[] = [];
  public departments: string[] = [];
  public cities: string[] = [];

  constructor( private citiesService: CitiesService ) {}

  ngOnInit(): void {
    this.citiesService.getDepartment().subscribe(
      value => { 
        //Guardando el objeto para saber el indice del departamento
        this.deparmentsInfo = value
        console.log(value)
        //Sacando el departamento
         this.departments = this.deparmentsInfo.map(department => department.name) 
         console.log( this.departments )
      }
    )
  }
  
  searchCities( departmentSelect: string ) {

    //Buscando el indice
    const department = this.deparmentsInfo.find(department => department.name === departmentSelect);

    if ( department ) {
      const id = department.id;
      this.citiesService.getCities( id ).subscribe(
        value => this.cities = value
  
    )
  }
}
}
