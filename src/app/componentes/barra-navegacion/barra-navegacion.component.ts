import { Component } from '@angular/core';
import { TokenService } from 'src/app/services/seguridad/token.service';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})
export class BarraNavegacionComponent {
//creammos dos variables booleanas y las inicializamos a false
//para saber si está logueado
isLogged=false;
//para saber si es admin
isAdmin=false;
//creamos una variable para guardar el email del usuario
emailUsuario : string;

constructor (private tokenService: TokenService) {}

ngOnInit(){
  //comprobamos si está logeado
  if(this.tokenService.getToken()){
    this.isLogged = true;
  }else {
    this.isLogged = false;
  }
  //comprobamos si es admin
  if(this.tokenService.getAuthorities() === 'ADMIN'){
    this.isAdmin = true;
  }
  //añadimos el email del usuario logueado a la vble creada
  this.emailUsuario = this.tokenService.getEmail();
}

//cerramos sesión
onLogOut(): void {
  this.tokenService.logOut();
  window.location.reload();
}
actualizar(){
  window.location.reload();
}
}
