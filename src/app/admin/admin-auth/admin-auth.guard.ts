import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    const isAdmin = this.checkIfUserHasAdminRole(); // Replace this with your actual logic

    if (token && isAdmin) {
      // User is authenticated and has admin role, allow access to admin routes
      return true;
    } else {
      // User is not authenticated or does not have admin role, redirect to login or unauthorized page
      this.router.navigate(['/login']); // Redirect to login page
      // this.router.navigate(['/unauthorized']); // Redirect to unauthorized page
      return false;
    }
  }

  private checkIfUserHasAdminRole(): boolean {
    // Implement your logic to check if the user has an admin role
    // Return true if the user has an admin role, otherwise return false
    // You may check user roles stored in local storage, make an API request, or use any other approach suitable for your application
    // Example:
    // const userRoles = localStorage.getItem('userRoles');
    // return userRoles.includes('admin');
    return false; // Placeholder return value, replace with your logic
  }
}
