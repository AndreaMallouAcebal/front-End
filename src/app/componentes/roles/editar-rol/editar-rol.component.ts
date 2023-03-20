import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from 'src/app/models/rol/rol';
import { Usuario } from 'src/app/models/usuario/usuario';
import { RolesService } from 'src/app/services/roles/roles.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-editar-rol',
  templateUrl: './editar-rol.component.html',
  styleUrls: ['./editar-rol.component.css']
})
export class EditarRolComponent {
  //recuperamos el id de la url 
  //id:number=parseInt(window.location.pathname.substr(0).split('/')[2]);
  id:number=this.activateRouter.snapshot.params['id'];
  rol:Rol=new Rol();
  usuarios: Usuario[]=[];
  public rolesForm: FormGroup;

  constructor(
    private activateRouter: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder,
    public rolesService : RolesService,
    public usuariosService : UsuariosService
  ) { }
  ngOnInit() {

    //cargamos las citas
    this.usuariosService.getAllUsuarios().subscribe(dato=>{
      this.usuarios = dato;
    });

    //guardamos las citas que tiene el animal
    this.usuarios=this.usuarios.filter(c=>c.rol.id=this.id)

    //asignamos al objeto animal los datos enviando el id recuperado
    this.rolesService.getRolId(this.id).subscribe(
      res=>{ this.rol=res},
      err=>console.log(err)
    );

    this.rolesForm = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  guardarRol(rol : Rol){
    this.rolesService.updateRol(rol).subscribe(dato => {
      this.rolesForm.reset();
      this.irALaListaDeAnimales();
    },
      error => { console.error(error) }

    );
  }
  irALaListaDeAnimales() {
    this.router.navigate(['/roles']);
  }

  onSubmit(): void {

  }
}
