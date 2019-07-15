import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/internal/operators/first';
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
    this.route.params
      .pipe(first())
      .toPromise()
      .then(params => {
        const id = params.id;
        if (id === 'create') {
          this.isCreateMode = true;
        } else {
          this.characterService.read(Number(id))
            .then(data => {
              this.character = data;
            })
            .catch(err => {
              console.error(err);
            });
        }
      })
      .catch(err => {
        console.error(err);
      });

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
