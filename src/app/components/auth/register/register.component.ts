import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth-service.service';
import { emailValidator } from 'src/app/shared/validators/check-existing-user-asyncvalidator';
import { sameValueGroupValidator } from 'src/app/shared/validators/password-match-validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm!: FormGroup;
  errorMsg: string = '';
  emailTouched: boolean = false;
  passTouched: boolean = false;
  reTouched: boolean = false;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email], [emailValidator(this.authService)]],
      password: ['', [Validators.required]],
      rePass: ['', [Validators.required]]
    }, { validator: sameValueGroupValidator('password', 'rePass') }); 
  }

  registerHandler(): void {
    if (this.userForm.valid) {
      const { email, password } = this.userForm.value;
      this.authService.register(email, password)
        .subscribe(user => {
          this.router.navigate(['/furniture']);
        });
    } else {
      this.errorMsg = 'Please correct the errors and try again.';
    }
  }
}
