import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AboutItem {
  id: number;
  attributes: {
    title: string;
    description: string;
    imageURL: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    accentColor: string; // Add a new property for accent color
  };
}

interface AboutHistory {
  id: number;
  attributes: {
    year: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  abouts: AboutItem[] = [];
  aboutHistories: AboutHistory[] = [];
  URL_API = 'http://localhost:1337';
  URL_API_ABOUTS = this.URL_API + '/api/abouts';
  URL_API_ABOUTHISTORIES = this.URL_API + '/api/about-histories';
  accentColor: string = ''; // Initialize the accentColor property

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAbouts();
    this.getAboutHistories();
    this.accentColor = this.getStoredColor() || this.getRandomColor(); // Retrieve the color from local storage or generate a new one
    this.setStoredColor(this.accentColor); // Save the color to local storage
  }

  getAbouts(): void {
    this.http.get<{ data: AboutItem[] }>(this.URL_API_ABOUTS).subscribe(response => {
      this.abouts = response.data.map(item => {
        item.attributes.accentColor = this.accentColor; // Assign the accent color to each item
        return item;
      });
      console.log(this.abouts);
    });
  }

  getAboutHistories(): void {
    this.http.get<{ data: AboutHistory[] }>(this.URL_API_ABOUTHISTORIES).subscribe(response => {
      this.aboutHistories = response.data;
      console.log(this.aboutHistories);
    });
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 6)];
    }
    return color;
  }

  getStoredColor(): string | null {
    return localStorage.getItem('accentColor');
  }

  setStoredColor(color: string): void {
    localStorage.setItem('accentColor', color);
  }
}
