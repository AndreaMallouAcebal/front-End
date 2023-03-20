import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Rol } from 'src/app/models/rol/rol';
import { RolesService } from 'src/app/services/roles/roles.service';

@Component({
  selector: 'app-listar-roles',
  templateUrl: './listar-roles.component.html',
  styleUrls: ['./listar-roles.component.css']
})
export class ListarRolesComponent {

  roles: Rol[];
  rol: Rol;
  
  constructor(
    public fb: FormBuilder,
    public rolesService: RolesService
  ) { }

  ngOnInit(): void {
    this.obtenerRoles();
  }

  private obtenerRoles() {
    this.rolesService.getAllRoles().subscribe(dato => {
      this.roles = dato;
    });
  }


  onClickEliminar(id: number) {
    this.rolesService.deleteRol(id).subscribe(
      citas => this.roles = this.roles.filter(r => r.id !== id)
    );
  }
}
