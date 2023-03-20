import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cita } from 'src/app/models/cita/cita';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private citaUrl= environment.miURL+"/citas";

  private miCitaUrl= environment.miURL+"/mis-citas";

  constructor(
    private http:HttpClient
  ) { }

  //método para obtener los empleados
  public getAllCitas():Observable<Cita[]>{
    return this.http.get<Cita[]>(this.citaUrl);
  }
  public getAllCitasUsuario(params: HttpParams):Observable<Cita[]>{
    return this.http.post<Cita[]>(this.miCitaUrl,params);
  }

  //método para registrar animal
  public saveCitaWithEmail(cita: Cita, email: string): Observable<Cita>{
    return this.http.post<Cita>(this.citaUrl+ '/' + email, cita);
  } 

  public saveCita(cita: Cita): Observable<Cita>{
    return this.http.post<Cita>(this.citaUrl, cita);
  } 

  public getCitaId(id:number): Observable<any>{
    return this.http.get(this.citaUrl + '/' + id) ; 
  }

  public updateCita(cita:Cita): Observable<any>{
    return this.http.put(this.citaUrl + '/' + cita.id , cita);
  }

   public deleteCita(id: number): Observable<Cita> {
     return this.http.delete<Cita>(this.citaUrl + '/' + id)
   }
}
