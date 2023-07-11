import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface MiddleDataItem {
  id: number;
  attributes: {
    title: string;
    description: string;
    imageURL: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

interface WhatsNewsItem {
  id: number;
  attributes: {
    title: string;
    linkText: string;
    imageURL: string;
    linkURL: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

interface Insights {
  id: number;
  attributes: {
    title: string;
    newsDate: string;
    description: string;
    linkURL: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  middleData: MiddleDataItem[] = [];
  whatsNewsData: WhatsNewsItem[] = [];
  insights: Insights[] = [];
  URL_API = 'http://localhost:1337';
  URL_API_MIDDLE = this.URL_API + '/api/home-middles';
  URL_API_WHATSNEWS = this.URL_API + '/api/home-whats-news';
  URL_API_INSIGHTS = this.URL_API + '/api/home-insights';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<{ data: MiddleDataItem[] }>(this.URL_API_MIDDLE).subscribe((result: any) => {
      this.middleData = result.data;
      console.log(this.middleData);
    });

    this.http.get<{ data: WhatsNewsItem[] }>(this.URL_API_WHATSNEWS).subscribe((result: any) => {
      this.whatsNewsData = result.data;
      console.log(this.whatsNewsData);
    });

    this.http.get<{ data: Insights[] }>(this.URL_API_INSIGHTS).subscribe((result: any) => {
      this.insights = result.data;
      console.log(this.insights);
    });

  }
}
