import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from '../character.service';
import { Character } from '../model/character';

@Component({
  selector: 'ngb-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<Character>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'culture'];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private characterService: CharacterService
  ) { }

  ngOnInit() {
    this.table.renderRows();
  }

  ngAfterViewInit() {
    this.table.dataSource = this.characterService.readAll();
  }

  showDetails(character: Character) {
    this.router.navigate([`./${character.id}`], {
      relativeTo: this.route
    });
  }

  createCharacter() {
    this.router.navigate(['./create'], {
      relativeTo: this.route
    });
  }
}
