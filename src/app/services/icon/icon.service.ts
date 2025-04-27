import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  icons: Array<SafeResourceUrl> = [];
  
  constructor(
      private matIconRegistry: MatIconRegistry,
      private sanitizer: DomSanitizer
    ) { }

    registerIcon(name: string, className: string) {
      let starIcon = this.sanitizer.bypassSecurityTrustResourceUrl(`/assets/icons/${name}.svg`);
      this.matIconRegistry.addSvgIcon(className, starIcon);
      //this.icons.push(starIcon);
    }
}
