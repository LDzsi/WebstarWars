import { Component } from '@angular/core';
import { UserData } from '../../../../../api/models/user-data';
import { SessionProvider } from '../../../../core/providers/session.provider';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { IconService } from '../../../../services/icon/icon.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  userData: UserData | undefined;
  isMobile = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private session: SessionProvider,
    private iconService: IconService
  ) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      this.isMobile = result.matches;
    });

    this.iconService.registerIcon('user', 'user-icon');
    this.iconService.registerIcon('logout', 'logout-icon');
  }

  logout() {
    this.session.logout();
  }

  async ngOnInit() {
    this.userData = this.session.getUser();
  }
}
