import { Injectable } from '@angular/core';
import { Environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor() {}

  getApiUrl(endpoint: string) {
    return `${Environment.baseUrl}/${endpoint}`;
  }
}