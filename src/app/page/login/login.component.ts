import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit(): void {
    const loginData = {
      identifier: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    console.log('Sending login data:', loginData);

    this.http.post('http://localhost:1337/api/auth/local', loginData, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Login error:', error);
          if (error.status === 400) {
            console.log('Bad Request - Check the request body and headers');
            console.log('Request URL:', error.url);
            console.log('Request Body:', loginData);
            console.log('Response Body:', error.error);
          }
          return throwError('Login failed');
        })
      )
      .subscribe(
        (res: any) => {
          console.log('Login response:', res);
          localStorage.setItem('token', res.jwt); // Store the token in localStorage
          this.router.navigate(['/dashboard']);
        },
        (error: any) => {
          console.error('Login failed:', error);
        }
      );
  }
}
