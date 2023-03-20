import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario/usuario';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuarioUrl= environment.miURL+"/usuarios";
  private usuarioAuth= environment.miURL+"/auth/new";
  private miPerfilUrl= environment.miURL+"/mi-perfil";
  private voluntarioUrl = environment.miURL+"/voluntarios";

  constructor(
    private http:HttpClient
  ) { }

  //método para obtener los empleados
  public getAllUsuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.usuarioUrl);
  }

  //método para registrar animal
  public saveUsuario(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.usuarioAuth, usuario);
  } 

  public getUsuariolId(id:number): Observable<any>{
    return this.http.get(this.usuarioUrl + '/' + id) ; 
  }

  public updateUsuario(usuario:Usuario): Observable<any>{
    return this.http.put(this.usuarioUrl + '/' + usuario.id , usuario);
  }

  public deleteUsuario(id: number): Observable<Usuario> {
     return this.http.delete<Usuario>(this.usuarioUrl + '/' + id)
   }

   public getMyUser(params: HttpParams): Observable<Usuario>{
    return this.http.post<Usuario>(this.miPerfilUrl, params);
   }

  public hacerVoluntario(usuario:Usuario): Observable<any>{
    return this.http.put(this.voluntarioUrl + '/' + usuario.id , usuario);
  }
}
