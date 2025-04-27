import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { CharacterSelectorComponent } from './features/character-selector/character-selector.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './core/modules/material.module';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SessionProvider } from './core/providers/session.provider';
import { LayoutComponent } from './shared/components/layout/layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CharacterSelectorComponent,
    LayoutComponent
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
    provideHttpClient(withFetch()),
    SessionProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
