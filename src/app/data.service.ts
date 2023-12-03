import { Injectable } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';
import { User } from './state/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

/**
 * Initially, wanted to use only service layer to manage state between components,
 * but decided to add in ngrx to show my understanding.
 */

export class DataService {
  url = "https://api.geoapify.com/v1/geocode/autocomplete?apiKey=6add1a67cbea40d5b26ff37435ac93a6&text=";
  constructor(private http: HttpClient) {
  }

  getAllPerson(): Observable<User[]> {
    return of(persons);
  }

  getAddressSuggestion(text: string) {
    let tmp = `${this.url}${text}`;
    return this.http.get(tmp);
  }

}

const persons: User[] = [
  {
    "id": 1,
    "name": "Luca",
    "email": "luca@gmail.com",
    "address": "119 Aljunied Avenue 2"
  },
  {
    "id": 2,
    "name": "Lilly",
    "email": "lilly@gmail.com",
    "address": "304 Orchard Road"
  },
  {
    "id": 3,
    "name": "Anna",
    "email": "anna@gmail.com",
    "address": "1085 Eunos Avenue 7A"
  },
  {
    "id": 4,
    "name": "John",
    "email": "john@gmail.com",
    "address": "37 Pandan Road"
  },
  {
    "id": 5,
    "name": "Mary",
    "email": "mary@gmail.com",
    "address": "53 Ubi Ave 1"
  }
];