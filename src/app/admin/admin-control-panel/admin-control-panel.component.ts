import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-control-panel',
  templateUrl: './admin-control-panel.component.html',
  styleUrls: ['./admin-control-panel.component.css']
})
export class AdminControlPanelComponent {
  newsList: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Fetch news data from Strapi API
    this.http.get('http://localhost:1337/news')
      .subscribe(
        (res: any) => {
          this.newsList = res;
        },
        (error: any) => {
          console.error('Failed to fetch news data:', error);
        }
      );
  }

  createNews(): void {
    // Perform the HTTP request to create news
    const newsData = {
      title: 'New News Title',
      description: 'New News Description'
      // Add more properties as necessary
    };

    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

    this.http.post('http://localhost:1337/news', newsData, { headers })
      .subscribe(
        (res: any) => {
          console.log('News created successfully:', res);
          // Perform any additional actions upon successful creation
        },
        (error: any) => {
          console.error('Failed to create news:', error);
          // Handle the error case
        }
      );
  }
}
