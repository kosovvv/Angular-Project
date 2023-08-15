import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthServiceService, private router: Router) { }

  ngOnInit(): void {
  }
  errorMsg: string = '';
  invalidEmail: boolean = false;
  invalidPass: boolean = false;

  
  user = {
    email: '',
    password: '',
  };

  loginHandler(form : any) {
  

    // Simulate registration logic (you can replace this with your actual registration logic)
    console.log(form.controls);
    this.user = form.controls;
    const { email, password, rePass } = form.value;
    this.authService.login(email, password)
      .subscribe(user => {
        this.router.navigate(['/furniture']);
        console.log('Successful reg')
      });

    // Clear error messages and reset form
    this.invalidEmail = false;
    this.invalidPass = false;
    this.errorMsg = '';

    // Reset form inputs
    this.user.email = '';
    this.user.password = '';
  }

}
