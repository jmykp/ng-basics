import { Injectable } from '@angular/core';
import { Character } from './model/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  readonly baseUrl = 'http://localhost:3000/characters';

  characters: Character[] = [
    { id: 1, name: 'Daenerys Targaryen', culture: 'Valyrian'},
    { id: 2, name: 'Jon Snow', culture: 'Northmen'}
  ];

  constructor() { }

  read(id: number): Promise<Character> {
    return fetch(`${this.baseUrl}/${id}`)
      .then(response => {
        return response.json();
      });
  }

  readAll(): Character[] {
    return this.characters;
  }

  update(character: Character) {
    const result = this.characters.findIndex(char => char.id === character.id);
    if (result >= 0) {
      this.characters[result] = character;
    }
  }

  create(character: Character) {
    character.id = this.characters[this.characters.length - 1].id + 1;
    this.characters.push(character);
  }
}
