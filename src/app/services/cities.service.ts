import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { CityCapital, Department, InfoDepartment } from '../interfaces/department.interface';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private urlDepartment: string = 'https://api-colombia.com/api/v1/Department';
  

  constructor( private http: HttpClient ) { }


  getDepartment(): Observable<InfoDepartment[]> {

     return this.http.get<Department[]>( this.urlDepartment ).pipe(
      map( departments => departments.map( dpto => {

        const infoDeparment: InfoDepartment = {
          id: dpto.id,
          name: dpto.name
        }

        return infoDeparment
      })),
      catchError( error => {
        console.log(error);
        return of([]);
      })
    )
  }

  getCities( idDepartment: number ): Observable<string[]> {
    const urlDepartmentTrueId: string = `${this.urlDepartment}`
    const urlCities: string = `${this.urlDepartment}/${idDepartment}/cities`;

    return this.http.get<CityCapital[]>( urlCities ).pipe(
      map( cities => cities.map( city => city.name))
    )
  }
}
