import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './basic-layout/dashboard/dashboard.component';
import { CharacterComponent } from './character/character/character.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'characters', component: CharacterComponent },
  { path: 'third-page', component: CharacterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
