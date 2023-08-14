import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
  }
  errorMsg: string = '';
  invalidEmail: boolean = false;
  invalidPass: boolean = false;
  invalidRe: boolean = false;
  
  user = {
    email: '',
    password: '',
    rePass: ''
  };

  loginHandler(form : any) {
    if (this.user.password !== this.user.rePass) {
      this.invalidPass = true;
      this.invalidRe = true;
      this.errorMsg = 'Passwords do not match.';
      return;
    }

    // Simulate registration logic (you can replace this with your actual registration logic)
    console.log(form.controls);
    this.user = form.controls;
    const { email, password, rePass } = form.value;
    this.authService.register(email, password)
      .subscribe(user => {
        this.router.navigate(['']);
        console.log('Successful reg')
      });

    // Clear error messages and reset form
    this.invalidEmail = false;
    this.invalidPass = false;
    this.invalidRe = false;
    this.errorMsg = '';

    // Reset form inputs
    this.user.email = '';
    this.user.password = '';
    this.user.rePass = '';
  }

}
