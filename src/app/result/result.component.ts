import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface SearchResult {
  id: number;
  title: string;
}

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  @Input() searchQuery: string = ''; // Initialize with an empty string
  searchResults: SearchResult[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.performSearch();
  }

  performSearch(): void {
    // Perform the search operation using the searchQuery
  }
}
