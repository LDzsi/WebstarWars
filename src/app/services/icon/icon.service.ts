import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  
  constructor(
      private matIconRegistry: MatIconRegistry,
      private sanitizer: DomSanitizer
    ) { }

    registerIcon(name: string, className: string) {
      let starIcon = this.sanitizer.bypassSecurityTrustResourceUrl(`/assets/icons/${name}.svg`);
      this.matIconRegistry.addSvgIcon(className, starIcon);
    }
}
