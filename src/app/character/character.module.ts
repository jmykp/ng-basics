import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import { BasicLayoutModule } from '../basic-layout/basic-layout.module';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterRoutingModule } from './character-routing.module';
import { CharacterComponent } from './character/character.component';

@NgModule({
  declarations: [
    CharacterComponent,
    CharacterListComponent
  ],
  exports: [
    CharacterComponent,
    CharacterListComponent
  ],
  imports: [
    CommonModule,
    CharacterRoutingModule,
    BasicLayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class CharacterModule { }
