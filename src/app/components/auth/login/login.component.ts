import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';
import { passwordValidator } from 'src/app/shared/validators/password-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm!: FormGroup;
  errorMsg: string = '';
  emailTouched: boolean = false;
  passTouched: boolean = false;

  constructor(private authService: AuthServiceService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator()]]
    });
  }

  loginHandler(): void {
    if (this.userForm.valid) {
      const { email, password } = this.userForm.value;
      this.authService.login(email, password)
        .subscribe(user => {
          this.router.navigate(['/furniture']);
        });
    } else {
      this.errorMsg = 'Please correct the errors and try again.';
    }
  }
}
