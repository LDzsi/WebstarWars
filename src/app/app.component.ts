import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Languages } from './shared/enums/languages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'WebstarWars';

  selectedLanguage: Languages;
  langs: Array<Languages> = [];

  constructor(
    private translate: TranslateService
  ) {
    translate.setDefaultLang('hu');
    this.selectedLanguage = Languages.HU;

    this.langs = Object.values(Languages);
  }
  
  switchLanguage(language: Languages) {
    this.selectedLanguage = language;
    this.translate.use(language);
  }

  getLanguageIcon(language: Languages) {
    switch(language) {
      case Languages.GB:
        return '🇬🇧';
      default:
        return '🇭🇺';
    }
  }

  getLanguageText(language: Languages) {
    switch(language) {
      case Languages.GB:
        return 'English';
      default:
        return 'Magyar';
    }
  }

  getLanguageClass(language: Languages):string {
    const base = 'fi fi';
    let lang = language;
    return `${base}-${lang}`;
  }
}
