import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patrocinador } from 'src/app/models/patrocinador/patrocinador';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PatrocinadoresService {

  
  private patrocinadorUrl=environment.miURL+"/patrocinadores";

  constructor(
    private http:HttpClient
  ) { }

  //método para obtener los empleados
  public getAllPatrocinadores():Observable<Patrocinador[]>{
    return this.http.get<Patrocinador[]>(this.patrocinadorUrl);
  }

  //método para registrar animal
  public savePatrocinador(patrocinador: Patrocinador): Observable<Patrocinador>{
    return this.http.post<Patrocinador>(this.patrocinadorUrl, patrocinador);
  } 

  public getPatrocinadorId(id:number): Observable<any>{
    return this.http.get(this.patrocinadorUrl + '/' + id) ; 
  }

  public updatePatrocinador(patrocinador:Patrocinador): Observable<any>{
    return this.http.put(this.patrocinadorUrl + '/' + patrocinador.id , patrocinador);
  }

   deletePatrocinador(id: number): Observable<Patrocinador> {
     return this.http.delete<Patrocinador>(this.patrocinadorUrl + '/' + id)
   }
}
