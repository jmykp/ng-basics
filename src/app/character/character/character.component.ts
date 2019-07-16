import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { filter, pluck, takeUntil } from 'rxjs/operators';
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
  form: FormGroup;

  private destroy = new Subject<boolean>();

  constructor(private characterService: CharacterService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
    this.form.patchValue({});

    this.route.params.pipe(
      pluck('id'),
      filter(id => id !== 'create'),
      switchMap((id: number) => this.characterService.read(Number(id))),
      takeUntil(this.destroy)
    ).subscribe((character: Character) => {
      if (character !== null) {
        this.form.patchValue(character);
        this.isCreateMode = false;
      } else {
        this.form.disable();
      }
    }, () => {
      console.error('Error loading character!');
    });
  }

  save() {
    if (!this.form.valid) {
      return;
    }
    let response$: Observable<Character>;
    if (this.isCreateMode) {
      response$ = this.characterService.create(this.form.getRawValue());
    } else {
      response$ = this.characterService.update(this.form.getRawValue());
    }
    response$
      .pipe(takeUntil(this.destroy))
      .subscribe(data => {
        if (data !== null) {
          alert('Successfully saved!');
        }
    });
    this.router.navigate([`../`], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }

  private initForm(): void {
    this.form = this.fb.group({
      id: [{ value: null, disabled: true }],
      name: [null, [Validators.required, Validators.maxLength(30)]],
      culture: [null]
    });
  }
}
