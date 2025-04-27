import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CharactersService } from '../../services/characters/characters.service';
import { Character } from '../../../api/models/character';
import { Subscription } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import { MatTabGroup } from '@angular/material/tabs';
import { IconService } from '../../services/icon/icon.service';

const enum Sides {
  Dark = 'DARK',
  Light = 'LIGHT'
}

@Component({
  selector: 'app-character-selector',
  templateUrl: './character-selector.component.html',
  styleUrl: './character-selector.component.scss'
})
export class CharacterSelectorComponent implements OnInit, OnDestroy {

  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  characters: Array<Character> = [];

  charactersListSubscription: Subscription | undefined = undefined;

  constructor(
    private charactersService: CharactersService,
    private iconService: IconService
  ) {
    this.iconService.registerIcon('chevron', 'chevron-icon');
    this.iconService.registerIcon('star', 'star-icon');
  }

  loadCharacters(): void {

    // TODO
    this.characters = [{
      id: 'vader',
      name: 'Darth Vader',
      side: {
        name: 'DARK',
        power: 'Sötét erő, fénykard',
        midichlorian: 21000
      },
      createdTimestamp: 1576967247,
      description: 'Nem, én vagyok az apád!'
    } as Character,
    {
      id: 'boba',
      name: 'Boba Fett',
      side: {
        name: 'DARK',
        power: 'Páncélzat',
        midichlorian: 0
      },
      createdTimestamp: 1576967247,
      description: 'Boba egy mandalori'
    } as Character,
    {
      id: 'anakin',
      name: 'Anakin Skywalker',
      side: {
        name: 'LIGHT',
        power: 'Erő, fénykard',
        midichlorian: 50000
      },
      createdTimestamp: 1576967247,
      description: 'Anakin Skywalker a kicsiny, félreeső és kietlen sivatagbolygón, a Tatuinon nevelkedett, ahol anyjával, Shmi Skywalkerrel együtt egy Watto nevű toydari ócskás rabszolgája volt. 9 éves korában talált rá a bolygóra érkező Jedi mester, Qui-Gon Jinn, aki, annak alapján, hogy Anakinnak nem volt apja, és, hogy a fiú vérében páratlanul magas számban voltak jelen a Midikloriánok, úgy vélte, meglelte a Jedi próféciákban megjövendölt Kiválasztottat, akinek feladata, hogy egyensúlyt hozzon az Erőbe.'
    } as Character] as Array<Character>;

    return;
    this.charactersListSubscription = this.charactersService.list().subscribe({
      next: (response) => {
        this.characters = response.items;
      },
      error: (error) => {
        console.error('Hiba történt:', error);
      },
      complete: () => {
        console.log('Lekérés sikeresen befejeződött.');
      }
    });
  }

  getPowerSideText(text: string |undefined) {
    if(!text) {
      return;
    }
    switch(text) {
      case Sides.Dark:
        return 'Sötét';
      case Sides.Light:
        return 'Világos';
      default:
        return '';
    }
  }

  getPowerSideClass(text: string |undefined) {
    if(!text) {
      return;
    }
    switch(text) {
      case Sides.Dark:
        return 'dark';
      case Sides.Light:
        return 'light';
      default:
        return '';
    }
  }

  getImageSrc(characterId: string | undefined, size?: string) {
    let fileName = `${characterId}${size ? `@${size}` : ''}.png`;
    return `assets/img/${fileName}`;
  }

  selectPrevious() {
    this.tabGroup.selectedIndex = (this.tabGroup.selectedIndex || 0) - 1;
  }

  selectNext() {
    this.tabGroup.selectedIndex = (this.tabGroup.selectedIndex || 0) + 1;
  }

  ngOnInit() {
    this.loadCharacters();
  }

  ngOnDestroy(): void {
    if(this.charactersListSubscription) {
      this.charactersListSubscription.unsubscribe();
    }
  }
}
