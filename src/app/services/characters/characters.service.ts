import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { Observable } from 'rxjs';
import { ListCharactersResponse } from '../../../api/models/list-characters-response';
import { API_URLS } from '../../shared/constants';
import { Environment } from '../../../environments/environment';
import { SessionProvider } from '../../core/providers/session.provider';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(
      private http: HttpClient,
      private configService: ConfigService,
      private session: SessionProvider
    ) {}

  list(): Observable<ListCharactersResponse> {    
    return this.http.post<ListCharactersResponse>(`${this.configService.getApiUrl(API_URLS.CHARACTERS)}`, {}, { headers: this.prepareHeader() });
  }

  private prepareHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Applicant-Id': Environment.applicantId,
      'Application-Authorization': `Bearer ${this.session.getToken()}`
    });
  }
}
