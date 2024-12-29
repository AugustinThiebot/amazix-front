import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null; // No error for empy field
      }

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const isValidLength = value.length >= 8;

      const passwordValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength;

      return passwordValid
        ? null
        : {
            passwordStrength: {
              hasUpperCase,
              hasLowerCase,
              hasNumber,
              hasSpecialChar,
              isValidLength,
            },
          };
    };
  }

  static matchFields(field1: string, field2: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const field1Value = group.get(field1)?.value;
      const field2Value = group.get(field2)?.value;

      if (field1Value !== field2Value) {
        return { fieldsMismatch: true };
      }
      return null;
    };
  }
}
