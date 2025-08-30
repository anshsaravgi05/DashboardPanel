// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../../auth.service';
// import { FormsModule } from '@angular/forms';
// //import { HttpClient, HttpHeaders } from '@angular/common/http';


// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html'
// })
// export class LoginComponent {
//   email = '';
//   password = '';
//   usertype = '';
//   errorMsg = '';

//   constructor(private auth: AuthService, private router: Router  ) {}

//   onLogin() {
//     if (!this.email || !this.password || !this.usertype) {
//       this.errorMsg = "All fields are required!";
//       return;
//     }

//     this.auth.login({ email: this.email, password: this.password, usertype: this.usertype })
//       .subscribe(res => {
//         if (res.success) {
//           if (res.usertype === 'admin') {
//             this.router.navigate(['/admin']);
//           } else {
//             this.router.navigate(['/user']);
//           }
//         } else {
//           this.errorMsg = res.message;
//         }
//       });
//   }
// }


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';
  usertype = '';
  errorMsg = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    // basic validation
    if (!this.email || !this.password || !this.usertype) {
      this.errorMsg = "All fields are required!";
      return;
    }

    // call AuthService
    this.auth.login({ email: this.email, password: this.password, usertype: this.usertype })
      .subscribe({
        next: (res) => {
          console.log("Login response:", res);

          if (res.success) {
            this.errorMsg = ''; // clear old errors

            // ✅ use usertype from backend if available
            const role = res.usertype || this.usertype;

            if (role === 'admin') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/user']);
            }
          } else {
            this.errorMsg = res.message || "Invalid login details!";
          }
        },
        error: (err) => {
          console.error("HTTP Error:", err);
          this.errorMsg = "Something went wrong. Please try again.";
        }
      });
  }
}
