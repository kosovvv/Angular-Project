import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth-service.service';
import { Observable } from 'rxjs';

export function emailValidator(authService: AuthService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return authService.getUserByEmail(control.value)
            .pipe(
                map(isExisting => {
                    return isExisting ? { emailExists: true } : null;
                })
            );
    };
}
