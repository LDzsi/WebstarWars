import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponseModel } from '../../../api/models/login-response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URLS } from '../../shared/constants';
import { ConfigService } from '../config/config.service';
import { Environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {}

  login(username: string, password: string): Observable<LoginResponseModel> {
    return this.http.post<LoginResponseModel>(`${this.configService.getApiUrl(API_URLS.AUTH)}`, { username, password }, { headers: this.prepareHeader() });
  }

  private prepareHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Applicant-Id': Environment.applicantId
    });
  }
}
