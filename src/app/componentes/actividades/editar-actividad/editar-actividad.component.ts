import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividad } from 'src/app/models/actividad/actividad';
import { Actividadusuario } from 'src/app/models/actividadusuario/actividadusuario';
import { Usuario } from 'src/app/models/usuario/usuario';
import { ActividadesService } from 'src/app/services/actividades/actividades.service';
import { ActividadesusuariosService } from 'src/app/services/actividadesusuarios/actividadesusuarios.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
//ventanas emegentes
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-actividad',
  templateUrl: './editar-actividad.component.html',
  styleUrls: ['./editar-actividad.component.css']
})
export class EditarActividadComponent {
  //variables
  id: number = this.activateRouter.snapshot.params['id'];
  actividad: Actividad = new Actividad();
  usuarios: Usuario[];
  actividadesusuarios: Actividadusuario[];
  public actividadesForm: FormGroup;

  constructor(
    private activateRouter: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder,
    public actividadesService: ActividadesService,
    public actividadesusuariosService: ActividadesusuariosService,
    public usuariosService: UsuariosService
  ) { }

  ngOnInit() {
    //asignamos al objeto animal los datos recuperados de la bdd
    this.actividadesService.getActividadId(this.id).subscribe(
      res => { this.actividad = res },
      err => console.log(err)
    );

    //formulario reactivo
    this.actividadesForm = this.fb.group({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      fecha: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required, Validators.maxLength(600)])
    });

    // this.recuperarusuarios();
  }

  //actualizamos la actividad en la bdd
  guardarActividad(actividad: Actividad) {
    this.actividadesService.updateActividad(actividad).subscribe(dato => {

      //Ventana emergente- mensaje de exito
      Swal.fire('Actividad editada con éxito')
      this.irALaListaDeActividades();
    },
      error => { console.error(error) }

    );
  }
  //Volver a la lista de actividades
  irALaListaDeActividades() {
    this.router.navigate(['/actividades']);
  }

  onSubmit(): void {
    console.log("editada con éxito");
  }
}
