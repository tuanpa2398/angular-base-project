import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '@app/shared/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    private httpClient: HttpClient
  ) { }

  login(data: LoginRequest){
    this.httpClient.post(``, data);
  }
}
