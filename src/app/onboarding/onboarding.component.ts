import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent {
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    acknowledge: new FormControl(false, Validators.requiredTrue),
  });

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit(): void {
    console.log('onboardingData:', this.userForm.value);
    if (this.userForm.value.acknowledge) {
      const onboardingData = {
        data: {
          email: this.userForm.value.email,
        },
      };

      console.log('onboardingData:', onboardingData); // Add this line

      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      this.http
        .post('http://localhost:1337/api/onboardings', onboardingData, { headers })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.error(error);
            if (error.error && error.error.details && error.error.details.errors) {
              console.log('Error message:', error.error.message);
              console.log('Error details:', error.error.details.errors);
            }
            return throwError('Onboarding failed');
          })
        )
        .subscribe(
          (res: any) => {
            console.log(res);
            const registrationData = {
              username: this.userForm.value.email,
              email: this.userForm.value.email,
              password: 'Cx123!@#',
            };

            this.http
              .post('http://localhost:1337/api/auth/local/register', registrationData)
              .pipe(
                catchError((error: HttpErrorResponse) => {
                  console.error(error);
                  return throwError('User registration failed');
                })
              )
              .subscribe(
                (response: any) => {
                  console.log(response);
                  const email = this.userForm.value.email;
                  if (email) {
                    this.sendNotification(email, 'Cx123!@#');
                  }
                  this.router.navigate(['/login']);
                },
                (error: any) => {
                  console.error(error);
                }
              );
          },
          (error: any) => {
            console.error(error);
          }
        );
    } else {
      console.log("User didn't acknowledge");
    }
  }

  sendNotification(email: string, password: string): void {
    // Implement the logic to send the notification here
    console.log(`Sending notification to ${email} with password ${password}`);
  }
}
