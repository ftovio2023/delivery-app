import { FormGroup } from "@angular/forms";

export function numberOneNumberTwoValidator(formGroup: FormGroup) {
    const numberOne = formGroup.get('numberOne')?.value ?? '';
    const numberTwo = (formGroup.get('numberTwo')?.value).toString() ?? '';
  
    if (numberOne.trim() && numberTwo.trim()) {
      return numberOne !== numberTwo ? null : { inputEquals: true };
    }
    return null;
  }
  
