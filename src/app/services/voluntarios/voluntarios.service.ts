import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Voluntario } from 'src/app/models/voluntario/voluntario';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class VoluntariosService {

  private voluntarioUrl= environment.miURL+"/voluntarios";

  constructor(
    private http:HttpClient
  ) { }

  //método para obtener los empleados
  public getAllVoluntarios():Observable<Voluntario[]>{
    return this.http.get<Voluntario[]>(this.voluntarioUrl);
  }

  //método para registrar animal
  public saveVoluntario(voluntario: Voluntario): Observable<Voluntario>{
    return this.http.post<Voluntario>(this.voluntarioUrl, voluntario);
  } 

  public getVoluntarioId(id:number): Observable<any>{
    return this.http.get(this.voluntarioUrl + '/' + id) ; 
  }

  public updateVoluntario(voluntario:Voluntario): Observable<any>{
    return this.http.put(this.voluntarioUrl + '/' + voluntario.id , voluntario);
  }

   deleteVoluntario(id: number): Observable<Voluntario> {
     return this.http.delete<Voluntario>(this.voluntarioUrl + '/' + id)
   }
}
