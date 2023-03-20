import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../seguridad/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProdGuardsService implements CanActivate {

  realRol: string;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRol = route.data['expectedRol'];
    const rol = this.tokenService.getAuthorities();
    this.realRol = 'USER';
    if (rol === 'ADMIN'){
      this.realRol = 'ADMIN';
    }
   if(!this.tokenService.getToken() || expectedRol.indexOf(this.realRol) === -1) {
    this.router.navigate(['/inicio']);
    return false;
   }
   return true;
  }
}
