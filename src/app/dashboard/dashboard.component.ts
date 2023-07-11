import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

interface Insights {
  id: number;
  attributes: {
    title: string;
    newsDate: string;
    description: string;
    linkURL: string;
    class: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userProfile: any;
  isLoggedIn = false;
  insightsData: Insights[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

      this.http.get('http://localhost:1337/api/users/me', { headers }).subscribe(
        (res: any) => {
          console.log('User profile response:', res);
          this.userProfile = res;
          this.isLoggedIn = true;
          this.fetchInsightsData(); // Fetch insights data for logged-in users
        },
        (error: HttpErrorResponse) => {
          console.error('User profile error:', error);
        }
      );
    } else {
      this.isLoggedIn = false;
    }
  }

  fetchInsightsData(): void {
    const insightsEndpoint = 'http://localhost:1337/api/home-insights';

    this.http.get<{ data: Insights[] }>(insightsEndpoint).subscribe((result: any) => {
      this.insightsData = result.data;
      console.log(this.insightsData);
    });
  }

  logout(): void {
    // Clear any user-related data or tokens
    localStorage.removeItem('token');
    this.isLoggedIn = false; // Set isLoggedIn to false or perform any other necessary logic
  }
}
