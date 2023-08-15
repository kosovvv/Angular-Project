import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn!: boolean
  email! : string | undefined;

  constructor(public authService: AuthServiceService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.email = user?.email;
    })
  }

}
