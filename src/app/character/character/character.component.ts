import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { first } from 'rxjs/internal/operators/first';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { catchError, filter, pluck, takeUntil } from 'rxjs/operators';
import { CharacterService } from '../character.service';
import { Character } from '../model/character';

@Component({
  selector: 'ngb-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit, OnDestroy {

  isCreateMode = true;
  character: Character = {} as Character;
  private destroy = new Subject<boolean>();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private characterService: CharacterService) { }

  ngOnInit() {
    this.route.params.pipe(
      pluck('id'),
      filter(id => id !== 'create'),
      switchMap((id: number) => this.characterService.read(Number(id))),
      takeUntil(this.destroy)
    ).subscribe((character: Character) => {
      this.character = character;
      this.isCreateMode = false;
    }, err => {
      console.error('Error loading character!');
    });
  }

  addCharacter() {
    this.character = {} as Character;
  }

  save() {
    let response$: Observable<Character>;
    if (this.isCreateMode) {
      response$ = this.characterService.create(this.character);
    } else {
      response$ = this.characterService.update(this.character);
    }
    response$.subscribe(() => {
      alert('Successfully saved!');
    });
    this.router.navigate([`../`], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }
}
