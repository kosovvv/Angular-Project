import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn!: boolean
  email! : string | undefined;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.email = user?.email;
    })
  }

}
