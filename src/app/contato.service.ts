import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  birthday: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  company: string;
  position: string;
  category: string; 
  favorite: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private readonly apiUrl = 'https://gahcontact.duckdns.org/contact';
  private contactChanged = new Subject<void>();

  constructor(private http: HttpClient) { }

  get contactChanged$() {
    return this.contactChanged.asObservable();
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }

  addContact(Contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, Contact); 
  }

  updateContact(Contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/${Contact.id}`,Contact);
  }

  deleteContact(Contact: Contact): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${Contact.id}`);
  }
}
