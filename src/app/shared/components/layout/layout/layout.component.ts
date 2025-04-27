import { Component } from '@angular/core';
import { UserData } from '../../../../../api/models/user-data';
import { SessionProvider } from '../../../../core/providers/session.provider';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  userData: UserData | undefined;
  userIcon: SafeResourceUrl;
  logoutIcon: SafeResourceUrl;

  constructor(
    private session: SessionProvider,
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.userIcon = this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/user.svg');
    this.logoutIcon = this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/logout.svg');
    
    this.matIconRegistry.addSvgIcon('user-icon', this.userIcon);
    this.matIconRegistry.addSvgIcon('logout-icon', this.logoutIcon);
  }

  logout() {
    this.session.logout();
  }

  async ngOnInit() {
    this.userData = this.session.getUser();
  }
}
