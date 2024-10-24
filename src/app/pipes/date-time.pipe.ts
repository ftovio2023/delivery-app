import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {
  
  transform(value: Date): string | null {
    if (!value) return null;

    const day = value.getDate() < 10 ? '0' + value.getDate() : value.getDate(); 
    const month = (value.getMonth() + 1) < 10 ? '0' + (value.getMonth() + 1) : (value.getMonth() + 1); 
    const year = value.getFullYear(); 
    let hours = value.getHours(); 
    const minutes = value.getMinutes() < 10 ? '0' + value.getMinutes() : value.getMinutes();

    const ampm = hours >= 12 ? 'PM' : 'AM'; 

    // Convertir horas de 24 a 12
    hours = hours % 12; 
    hours = hours ? hours : 12; 

    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}.`; 
  }
}
