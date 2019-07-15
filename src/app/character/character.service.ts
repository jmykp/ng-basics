import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/operators';
import { Character } from './model/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  readonly baseUrl = 'http://localhost:3000/characters';

  catch = () => {
    alert('Verbindungsprobleme');
    return of(null);
  }

  constructor(private httpClient: HttpClient) { }

  readAll(): Observable<Character[]> {
    return this.httpClient.get<Character[]>(`${this.baseUrl}?_start=20&_end=120`)
      .pipe(catchError(() => {
        alert('Verbindungsprobleme');
        return of([]);
      }));
  }

  read(id: number): Observable<Character> {
    return this.httpClient.get<Character>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.catch));
  }

  update(character: Character): Observable<Character> {
    return this.httpClient.put<Character>(`${this.baseUrl}/${character.id}`, character)
      .pipe(catchError(this.catch));
  }

  create(character: Character): Observable<Character> {
    return this.httpClient.post<Character>(this.baseUrl, character)
      .pipe(catchError(this.catch));
  }
}
