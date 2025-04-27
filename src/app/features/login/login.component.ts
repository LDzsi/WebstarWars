import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { SessionProvider } from '../../core/providers/session.provider';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private redirectUrl?: string | null | undefined;

  public form = new UntypedFormGroup({
    username: new UntypedFormControl(null, [Validators.required]),
    password: new UntypedFormControl(null, [Validators.required]),
  });

  constructor(
    private session: SessionProvider
  ) {}

  async onLogin() {
    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;

    try {
      const loginResult = this.session.login(username, password, this.redirectUrl);
      if (loginResult === undefined || loginResult === null) {
        this.form.setErrors({ 'invalidCredentials': true });
      }
    } catch (error) {
      // Egyéb logolás/hibakezelés
      console.log(error);
    }
  }

  onLogout() {
    this.session.logout();
  }
  
  ngOnInit() {
    this.redirectUrl = this.session.getRedirectUrl();
  }
}
