import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CharactersService } from '../../services/characters/characters.service';
import { Character } from '../../../api/models/character';
import { Subscription } from 'rxjs';
import { MatTabGroup } from '@angular/material/tabs';
import { IconService } from '../../services/icon/icon.service';
import { Sides } from '../../shared/enums/sides';
import { TranslateService } from '@ngx-translate/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-character-selector',
  templateUrl: './character-selector.component.html',
  styleUrl: './character-selector.component.scss'
})
export class CharacterSelectorComponent implements OnInit, OnDestroy {

  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  isMobile = false;

  characters: Array<Character> = [];
  private charactersListSubscription: Subscription | undefined = undefined;

  constructor(
    private translate: TranslateService,
    private breakpointObserver: BreakpointObserver,
    private charactersService: CharactersService,
    private iconService: IconService
  ) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      this.isMobile = result.matches;
    });

    this.iconService.registerIcon('chevron', 'chevron-icon');
    this.iconService.registerIcon('star', 'star-icon');
  }

  ngOnInit() {
    this.loadCharacters();
  }

  ngOnDestroy(): void {
    if(this.charactersListSubscription) {
      this.charactersListSubscription.unsubscribe();
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

  getPowerSideText(text: string |undefined) {
    if(!text) {
      return;
    }
    switch(text) {
      case Sides.Dark:
        return this.translate.instant('UI.Common.Force.Dark');
      case Sides.Light:
        return this.translate.instant('UI.Common.Force.Light');
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

  private loadCharacters(): void {
    this.characters = this.getMockedCharacters(); return; // INDOK: README-ben!

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

  private getMockedCharacters(): Array<Character> {
    return [{
      id: 'vader',
      name: 'Darth Vader',
      side: {
        name: 'DARK',
        power: 'Sötét erő, fénykard',
        midichlorian: 21000
      },
      createdTimestamp: 1576967247,
      description: 'Darth Vader (született: Anakin Skywalker) az egyik központi figurája George Lucas Csillagok háborúja univerzumának.<br><br>Vader az egyik legmarkánsabb, legikonikusabb és legkarizmatikusabb gonosztevő a filmtörténelemben, hatalmas (bár még emberléptékű) termetével, sötét sisakjával, félelmetes akusztikájú, jellegzetes lélegzetvételével és hangképzésével. Az Amerikai Filmintézet „100 hős és gonosztevő” listáján a 3. helyezést kapta és az IGN top 100 villains of all time listáján 1. lett.'
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
      description: 'Boba Fett egy mandalori származású harcos és fejvadász volt. Nem természetes úton jött világra, ugyanis a hírhedt mandalori fejvadász, Jango Fett klónja és fogadott gyermeke volt, akinek kérésére a kaminoiak hozták létre a Yavini csata előtt 32-ben.<br><br>Bár Boba Fett a Galaktikus Köztársaság klónkatonáival egy időben és helyen született, kivételesnek számított, mivel apja utasítására a Kamino biomérnökei nem módosították a génjeit. Így a többi klónnal ellentétben természetes ütemben fejlődött és létrejöttétől eltekintve biológiai értelemben nagyjából normális egyede volt fajának, hiszen genetikailag Jango Fett tökéletes másolata volt.'
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
  }
}
