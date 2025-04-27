import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../features/login/login.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { HomeComponent } from '../features/home/home.component';
import { CharacterCreatorComponent } from '../features/character-creator/character-creator.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'characters', component: CharacterCreatorComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
