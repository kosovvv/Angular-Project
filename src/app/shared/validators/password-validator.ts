import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const password = control.value as string;

        if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
            return { invalidPassword: true };
        }

        return null;
    };
}
