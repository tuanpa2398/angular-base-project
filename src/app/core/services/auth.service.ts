import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUser, LoginRequest, LoginResponse, RefreshTokenResponse } from '@app/shared/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private appUser: AppUser | undefined;

  REFRESH_TOKEN: string = "refresh_token";
  ACCESS_TOKEN: string = "access_token";

  private PREFIX_AUTH_API = `/auth`

  constructor(
    private httpClient: HttpClient
  ) { }

  login(data: LoginRequest) {
    this.httpClient.post<LoginResponse>(`${this.PREFIX_AUTH_API}/login`, data);
  }

  refreshToken() {
    return this.httpClient.post<RefreshTokenResponse>(`${this.PREFIX_AUTH_API}/refresh-token`, {
      refreshToken: this.getRefreshToken()
    });
  }

  getCurrentAppUser() {
    return this.httpClient.get<AppUser>('/user/get-current-user');
  }

  logout() {
    this.clearUserAuthen();
    this.clearToken();
  }

  clearUserAuthen() {
    this.appUser = undefined;
  }

  clearToken() {
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.removeItem(this.ACCESS_TOKEN);
  }

  store(data: LoginResponse) {
    localStorage.setItem(this.REFRESH_TOKEN, data.refreshToken);
    localStorage.setItem(this.ACCESS_TOKEN, data.accessToken);

    this.appUser = data.user;
  }

  storeUser(u: AppUser) {
    this.appUser = u;
  }

  getAccessToken() {
    return localStorage.getItem(this.ACCESS_TOKEN) ?? null;
  }

  getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN) ?? null;
  }

  getCurrentUser() {
    return this.appUser;
  }
}
