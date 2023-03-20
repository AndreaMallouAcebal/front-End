import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from 'src/app/models/rol/rol';
import { Usuario } from 'src/app/models/usuario/usuario';
import { RolesService } from 'src/app/services/roles/roles.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-registrar-rol',
  templateUrl: './registrar-rol.component.html',
  styleUrls: ['./registrar-rol.component.css']
})
export class RegistrarRolComponent {

  //recuperamos el id de la url 
  //id:number=parseInt(window.location.pathname.substr(0).split('/')[2]);
  id:number=this.activateRouter.snapshot.params['id'];
  rol:Rol=new Rol();
  public rolesForm: FormGroup;

  constructor(
    private activateRouter: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder,
    public rolesService : RolesService,
  ) { }
  ngOnInit() {

    this.rolesForm = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  guardarRol(rol : Rol){
    this.rolesService.saveRol(rol).subscribe(dato => {
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
