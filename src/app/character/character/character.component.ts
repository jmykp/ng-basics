import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from '../character.service';
import { Character } from '../model/character';

@Component({
  selector: 'ngb-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  isCreateMode = false;
  character: Character = {} as Character;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private characterService: CharacterService) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    if (id === 'create') {
      this.isCreateMode = true;
    } else {
      this.character = this.characterService.read(Number(id));
    }
  }

  addCharacter() {
    this.character = {} as Character;
  }

  save() {
    if (this.isCreateMode) {
      this.characterService.create(this.character);
    } else {
      this.characterService.update(this.character);
    }
    this.router.navigate([`../`], { relativeTo: this.route });
    alert('Successfully saved!');
  }

}
