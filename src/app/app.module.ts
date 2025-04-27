import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { CharacterCreatorComponent } from './features/character-creator/character-creator.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './core/modules/material.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './features/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SessionProvider } from './core/providers/session.provider';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CharacterCreatorComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    SessionProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
