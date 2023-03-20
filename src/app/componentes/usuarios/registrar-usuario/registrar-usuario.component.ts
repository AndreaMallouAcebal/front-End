import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Rol } from 'src/app/models/rol/rol';
import { Usuario } from 'src/app/models/usuario/usuario';
import { RolesService } from 'src/app/services/roles/roles.service';
import { AuthService } from 'src/app/services/seguridad/auth.service';
//ventanas emegentes
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent {
usuario:Usuario=new Usuario();
public usuariosForm: FormGroup;
rol: Rol;
roles: Rol[];

constructor(
  private router: Router,
  public fb: FormBuilder,
  public authService:AuthService,
  public rolesService : RolesService
) { }

ngOnInit() {

  this.obtenerRoles();

  this.usuariosForm = this.fb.group({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(45)]),
    apellidos: new FormControl('', [Validators.required, Validators.maxLength(45)]),
    email: new FormControl('', [Validators.required]),
    dni: new FormControl('', [Validators.required, Validators.maxLength(9), Validators.minLength(9)]),
    contrasenia: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rol_id: new FormControl('', [Validators.required]),
  });
}

private obtenerRoles(){
  this.rolesService.getAllRoles().subscribe(dato=>{
    this.roles = dato
  });
}

guardarUsuario(usuario : Usuario){
  this.authService.nuevo(usuario).subscribe(dato => {
    Swal.fire('Usuario registrado con éxito');
    this.usuariosForm.reset();
    this.irALaListaDeUsuarios();
  },
    error => { console.error(error) }

  );
}

setRolUsuario() {
  this.usuario.rol = this.rol;
}

irALaListaDeUsuarios() {
  this.router.navigate(['/usuarios']);
}

onSubmit(): void {
  this.guardarUsuario(this.usuario);
}
}
