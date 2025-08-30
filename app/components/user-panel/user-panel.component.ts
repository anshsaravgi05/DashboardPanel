import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html'
})
export class UserPanelComponent implements OnInit {
  name = '';
  email = '';
  phone = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.checkSession().subscribe(res => {
      if (res.loggedIn && res.user.usertype === 'user') {
        this.name = res.user.name;
        this.email = res.user.email;
        this.phone = res.user.phone;
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  logout() {
    this.auth.logout().subscribe(() => this.router.navigate(['/login']));
  }
}
