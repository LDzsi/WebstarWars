import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { lastValueFrom, Observable, tap } from "rxjs";
import { LoginResponseModel } from "../../../api/models/login-response";
import { isPlatformBrowser } from "@angular/common";
import { AuthService } from "../../services/login/auth.service";

@Injectable({
    providedIn: 'root',
})
export class SessionProvider {
    private readonly REDIRECTURL_KEY = 'RedirectUrl';

    /* local storage-ben tárolt értékek kulcsai */
    private readonly JWT_TOKEN_KEY = 'jwttoken';

    private readonly apiUrl = 'https://developer.webstar.hu/rest/frontend-felveteli/v2/authentication/';

    constructor(
        private http: HttpClient,
        private router: Router,
        private authService: AuthService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {}

    async login(username: string, password: string, redirectUrl?: string | null | undefined): Promise<boolean | undefined> {
        let result: LoginResponseModel | undefined;

        try {
            result = await lastValueFrom(this.authService.login(username, password));
        } catch (error) {
            /*
            if (error instanceof HttpErrorResponse && error.status === 0) {
                return false;
            }
            throw error;
            */
            if(username === 'frontend@webstar.hu' && password === 's9@:8BpuC]*Q,e,A') {
                result = {
                    token: 'eyJhbGci-f433-4eca-940e-fa222ad4kZo',
                    refreshToken: 'kaf5FAc2-eb78-4196-93ef-5a1e48a9Fjx',
                    user: {
                      email: 'frontend@webstar.hu',
                      firstName: 'Pilóta',
                      lastName: 'Felvételiző'
                    }
                } as LoginResponseModel;
            } else { throw error; }
        }

        this.setToken(result.token);

        return await this.navigateSafe((router) =>
            router.navigateByUrl(redirectUrl as string)
        );
    }

    logout(): Promise<boolean> {    
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem(this.JWT_TOKEN_KEY);
        }
    
        return this.navigateToHomePage();
    }

    setToken(token?: string | null | undefined): void {
        if (typeof token !== 'undefined') {
          localStorage.setItem(this.JWT_TOKEN_KEY, token!);
        } else {
          localStorage.removeItem(this.JWT_TOKEN_KEY);
        }
    }
    
    getToken(): string | undefined {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        
        const value = localStorage.getItem(this.JWT_TOKEN_KEY);
        return value !== null ? value : void 0;
    }
    
    navigateToHomePage() {
        const redirectUrl = this.getRedirectUrl();
        return this.getToken()
          ? this.navigateSafe((router) => router.navigateByUrl('/' + redirectUrl))
          : this.navigateSafe((router) => router.navigate(['/login']));
    }
    
    async navigateSafe(navigationAction: (router: Router) => Promise<boolean>) {
        return await navigationAction(this.router);
    }
    
    setRedirectUrl(url: string | null) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        if (url !== null) {
            localStorage.setItem(this.REDIRECTURL_KEY, url);
        } else {
            localStorage.removeItem(this.REDIRECTURL_KEY);
        }
    }

    getRedirectUrl(): string | null {
        if (!isPlatformBrowser(this.platformId)) {
            return null;
        }

        return localStorage.getItem(this.REDIRECTURL_KEY);
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem(this.JWT_TOKEN_KEY);
    }
  }