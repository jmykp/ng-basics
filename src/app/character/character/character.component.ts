import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../character.service';
import { Character } from '../model/character';

@Component({
  selector: 'ngb-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  character: Character = {} as Character;

  constructor(private route: ActivatedRoute,
              private characterService: CharacterService) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.character = this.characterService.read(Number(id));
  }

  addCharacter() {
    this.character = {} as Character;
  }

}
