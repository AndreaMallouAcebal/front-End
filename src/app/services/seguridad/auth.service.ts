import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDTO } from 'src/app/models/login/jwt-dto';
import { UserLogin } from 'src/app/models/login/login-usuario';
import { NuevoUsuario } from 'src/app/models/login/nuevo-usuario';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = environment.miURL+'/auth/';

  constructor(private httpClient: HttpClient) { }

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any>{
    return this.httpClient.post<any>(this.authURL + 'new', nuevoUsuario);
  }

  public login(userLogin: UserLogin): Observable<JwtDTO>{
    return this.httpClient.post<JwtDTO>(this.authURL + 'login', userLogin);
  }

}
