import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cita } from 'src/app/models/cita/cita';
import { Rol } from 'src/app/models/rol/rol';
import { Usuario } from 'src/app/models/usuario/usuario';
import { CitasService } from 'src/app/services/citas/citas.service';
import { RolesService } from 'src/app/services/roles/roles.service';
import { TokenService } from 'src/app/services/seguridad/token.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
//ventanas emegentes
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent {
  //recuperamos el id de la url 
  id:number=this.activateRouter.snapshot.params['id'];
  usuario:Usuario=new Usuario();
  citas: Cita[]=[];
  public usuariosForm: FormGroup;
  rol:Rol;
  roles:Rol[];
  isAdmin=false;


  constructor(
    private activateRouter: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder,
    public usuariosService : UsuariosService,
    public citasService : CitasService,
    public rolesService : RolesService,
    private tokenService: TokenService
  ) { }
  ngOnInit() {
    //comprobamos si el usuario es admin
    if (this.tokenService.getAuthorities() === 'ADMIN') {
      this.isAdmin = true;
    }

    //cargamos las citas
    this.citasService.getAllCitas().subscribe(dato=>{
      this.citas = dato;
    });

    //guardamos las citas que tiene el animal
    this.citas=this.citas.filter(c=>c.animal.id=this.id)

    this.obtenerRoles();

    //asignamos al objeto animal los datos enviando el id recuperado
    this.usuariosService.getUsuariolId(this.id).subscribe(
      res=>{ this.usuario=res},
      err=>console.log(err)
    );

    this.usuariosForm = this.fb.group({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      apellidos: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      email: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.required, Validators.maxLength(9), Validators.minLength(9)])
    });
  }

  guardarUsuario(usuario : Usuario){
    this.usuariosService.updateUsuario(usuario).subscribe(dato => {
      Swal.fire('Usuario editado con éxito');
      this.usuariosForm.reset();
      this.irAlPerfil();
    },
      error => { console.error(error) }

    );
  }

  private obtenerRoles() {
    this.rolesService.getAllRoles().subscribe(roles => {
      this.roles = roles;
    });
  }

  setRolUsuario() {
    this.usuario.rol = this.rol;
  }

  irAlPerfil() {
    if(!this.isAdmin){
    this.router.navigate(['/mi-perfil']);
    }
    if(this.isAdmin){
      this.router.navigate(['/usuarios']);
    }
  }

  onSubmit(): void {
   
  }

}
