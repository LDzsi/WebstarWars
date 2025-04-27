import { Component } from '@angular/core';
import { SessionProvider } from '../../core/providers/session.provider';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private session: SessionProvider
  ) {}

  logout() {
    this.session.logout();
  }
}
