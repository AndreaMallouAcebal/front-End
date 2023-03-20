import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actividad } from 'src/app/models/actividad/actividad';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

 
  private actividadUrl=environment.miURL+"/actividades";

  constructor(
    private http:HttpClient
  ) { }

  //método para obtener los empleados
  public getAllActividades():Observable<Actividad[]>{
    return this.http.get<Actividad[]>(this.actividadUrl);
  }

  //método para registrar animal
  public saveActividad(actividad: Actividad): Observable<Actividad>{
    return this.http.post<Actividad>(this.actividadUrl, actividad);
  } 

  public getActividadId(id:number): Observable<any>{
    return this.http.get(this.actividadUrl + '/' + id) ; 
  }

  public updateActividad(actividad:Actividad): Observable<any>{
    return this.http.put(this.actividadUrl + '/' + actividad.id , actividad);
  }

   deleteActividad(id: number): Observable<Actividad> {
     return this.http.delete<Actividad>(this.actividadUrl + '/' + id)
   }
}
