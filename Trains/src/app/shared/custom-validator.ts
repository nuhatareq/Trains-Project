import { FormControl, ValidationErrors } from '@angular/forms';

export class Validatorsboo {
  static checkDateGreaterThanToday(
    control: FormControl
  ): ValidationErrors | null {
    if (new Date(control.value) < new Date()) {
      return { startDate: true };
    }
    return null;
  }
}
