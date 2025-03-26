import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private xmlUrl = 'assets/mockdata/data.xml'; // Path to your XML file

  constructor(private http: HttpClient) {}

  getXmlData(): Observable<string> {
    return this.http.get(this.xmlUrl, { responseType: 'text' });
  }
}
