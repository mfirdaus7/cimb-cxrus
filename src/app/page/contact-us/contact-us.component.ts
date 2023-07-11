import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Contact {
  attributes: {
    content: string;
  };
}

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contacts: Contact[] = [];
  URL_API = 'http://localhost:1337';
  URL_API_CONTACTS = this.URL_API + '/api/contact-uses';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<{ data: Contact[] }>(this.URL_API_CONTACTS).subscribe((result: any) => {
      this.contacts = result.data;
      console.log(this.contacts);
    });
  }



}
