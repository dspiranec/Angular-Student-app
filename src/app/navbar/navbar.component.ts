import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { LoginService } from '../login/login.service';
import { User } from '../user/user.model';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isNavbarCollapsed: boolean;

  constructor(
    private loginService: LoginService,
    public userService: UserService,
    private router: Router,
    public translate: TranslateService) {
      translate.addLangs(['hr', 'en', 'it']);
      translate.setDefaultLang('hr');
  
      const browserLang = translate.getBrowserLang();
    }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((currentUser: User) => {
      this.userService.currentUser = currentUser;
    });
  }


  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  logout() {
    this.loginService.logout();
    this.userService.currentUser = null;
    this.router.navigate(['/login']);
  }

  isUserLoggedIn(): boolean {
    return !!this.userService.currentUser;
  }
}
