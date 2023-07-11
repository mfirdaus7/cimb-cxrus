import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  login(): void {
    const loginData = {
      identifier: this.username,
      password: this.password
    };

    this.http.post('http://localhost:1337/auth/local', loginData)
      .subscribe(
        (res: any) => {
          // Store the JWT token in local storage
          localStorage.setItem('token', res.jwt);
          // Redirect to the admin control panel
          this.router.navigate(['/admin/dashboard']);
        },
        (error: any) => {
          console.error('Login failed:', error);
          // Handle login error, display error message, etc.
        }
      );
  }
}
