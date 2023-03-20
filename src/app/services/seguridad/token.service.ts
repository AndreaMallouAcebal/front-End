import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const EMAIL_KEY = 'AuthEmail';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  rol : string; 

  constructor() { }

  public setToken(token: string) : void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY)!;
  }

  public setEmail(email: string) : void {
    window.sessionStorage.removeItem(EMAIL_KEY);
    window.sessionStorage.setItem(EMAIL_KEY,email);
  }

  public getEmail(): string {
    return sessionStorage.getItem(EMAIL_KEY)!;
  }

  public setAuthorities(authorities: string[]) : void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY,JSON.stringify(authorities));
  }

  public getAuthorities(): string {
    this.rol = "";
    let auth = sessionStorage.getItem(AUTHORITIES_KEY);
    if(auth){
      this.rol = JSON.parse(auth!)[0].authority;
     }
    return this.rol;
  }

  public logOut(): void {
    window.sessionStorage.clear();
  }
}
