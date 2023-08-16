import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AuthServiceService } from '../services/auth-service.service';
import { Observable } from 'rxjs';

export function emailValidator(authService: AuthServiceService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return authService.getUserByEmail(control.value)
            .pipe(
                map(isExisting => {
                    return isExisting ? { emailExists: true } : null;
                })
            );
    };
}
