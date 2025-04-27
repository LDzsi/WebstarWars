import { Component, OnDestroy, OnInit } from '@angular/core';
import { CharactersService } from '../../services/characters/characters.service';
import { Character } from '../../../api/models/character';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-character-creator',
  templateUrl: './character-creator.component.html',
  styleUrl: './character-creator.component.scss'
})
export class CharacterCreatorComponent implements OnDestroy {

  characters: Array<Character> = [];

  charactersListSubscription: Subscription | undefined = undefined;

  constructor(
    private charactersService: CharactersService
  ) {}

  listCharacters(): void {

    this.charactersListSubscription = this.charactersService.list().subscribe({
      next: (response) => {
        this.characters = response.items;
      },
      error: (error) => {
        console.error('Hiba történt:', error);
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
        } as Character] as Array<Character>;
      },
      complete: () => {
        console.log('Lekérés sikeresen befejeződött.');
      }
    });
  }

  ngOnDestroy(): void {
    if(this.charactersListSubscription) {
      this.charactersListSubscription.unsubscribe();
    }
  }
}
