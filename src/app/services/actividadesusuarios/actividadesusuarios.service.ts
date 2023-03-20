import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actividadusuario } from 'src/app/models/actividadusuario/actividadusuario';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ActividadesusuariosService {

 
  private actividadusuarioUrl=environment.miURL+"/actividadesusuarios";

  private verusuariosUrl=environment.miURL+"/ver-usuarios"

  

  constructor(
    private http:HttpClient
  ) { }

  //método para obtener los empleados
  public getAllActividadesusuarios():Observable<Actividadusuario[]>{
    return this.http.get<Actividadusuario[]>(this.actividadusuarioUrl);
  }
  public getAllActividadesusuariosByActividad(id:number):Observable<Actividadusuario[]>{
    return this.http.get<Actividadusuario[]>(this.verusuariosUrl + '/' + id);
  }

  //método para registrar animal
  public saveActividadusuario(actividadusuario: Actividadusuario): Observable<Actividadusuario>{
    return this.http.post<Actividadusuario>(this.actividadusuarioUrl, actividadusuario);
  } 
  public saveActividadWithEmail(params: HttpParams): Observable<Actividadusuario>{
    return this.http.post<Actividadusuario>(this.actividadusuarioUrl,params);
  } 

  public getActividadusuarioId(id:number): Observable<any>{
    return this.http.get(this.actividadusuarioUrl + '/' + id) ; 
  }

  public updateActividadusuario(actividadusuario:Actividadusuario): Observable<any>{
    return this.http.put(this.actividadusuarioUrl + '/' + actividadusuario.id , actividadusuario);
  }

   public deleteActividadusuario(id:number): Observable<Actividadusuario> {
     return this.http.delete<Actividadusuario>(this.actividadusuarioUrl+ '/' + id);
   }
}
