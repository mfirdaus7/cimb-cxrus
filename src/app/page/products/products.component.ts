import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ProductsItem {
  id: number;
  attributes: {
    title: string;
    description: string;
    image: string;
    customDate: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}


@Component({
  selector: 'app-about',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: ProductsItem[] = [];
  URL_API = 'http://localhost:1337';
  URL_API_PRODUCTS = this.URL_API + '/api/products';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.http.get<{ data: ProductsItem[] }>(this.URL_API_PRODUCTS).subscribe(response => {
      this.products = response.data;
      console.log(this.products);
    });
  }
}
