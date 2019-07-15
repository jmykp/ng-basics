import { Injectable } from '@angular/core';
import { Character } from './model/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  characters: Character[] = [
    { id: 1, name: 'Daenerys Targaryen', culture: 'Valyrian'},
    { id: 2, name: 'Jon Snow', culture: 'Northmen'}
  ];

  constructor() { }

  read(id: number): Character {
    const result = this.characters.filter(character => character.id === id);
    return result.length > 0 ? result[0] : null;
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
    this.characters.push(character);
  }
}
