import { Component, OnInit } from '@angular/core';
import { SessionProvider } from '../../core/providers/session.provider';
import { UserData } from '../../../api/models/user-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  userData: UserData | undefined;

  constructor(
    private session: SessionProvider
  ) {}

  logout() {
    this.session.logout();
  }

  async ngOnInit() {
    this.userData = this.session.getUser();
  }
}
