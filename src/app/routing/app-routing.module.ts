import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../features/login/login.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { CharacterSelectorComponent } from '../features/character-selector/character-selector.component';
import { LayoutComponent } from '../shared/components/layout/layout/layout.component';

const routes: Routes = [
  /*
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'characters', component: CharacterCreatorComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  */
  {
    path: '',
    redirectTo: 'character-selector', // Az alapértelmezett irányítás
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutComponent, // Layout lesz az alap
    children: [
      { path: 'character-selector', component: CharacterSelectorComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'character-selector', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
