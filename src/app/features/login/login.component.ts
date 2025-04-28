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
    username: new UntypedFormControl(null, [Validators.required, Validators.email]),
    password: new UntypedFormControl(null, [Validators.required]),
  });

  constructor(
    private session: SessionProvider
  ) {}

  ngOnInit() {
    this.redirectUrl = this.session.getRedirectUrl();
  }

  async onLogin() {
    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;

    if(this.form.invalid) {
      this.form.setErrors({ 'invalidCredentials': true });
      return;
    }

    try {
      const loginResult = await this.session.login(username, password, this.redirectUrl);
      if (!loginResult) {
        this.form.setErrors({ 'invalidCredentials': true });
      }
    } catch (error) {
      // Egyéb logolás/hibakezelés
      console.log(error);
      this.form.setErrors({ 'invalidCredentials': true });
    }
  }

  onLogout() {
    this.session.logout();
  }
}
