import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividad } from 'src/app/models/actividad/actividad';
import { Actividadusuario } from 'src/app/models/actividadusuario/actividadusuario';
import { Usuario } from 'src/app/models/usuario/usuario';
import { ActividadesService } from 'src/app/services/actividades/actividades.service';
import { ActividadesusuariosService } from 'src/app/services/actividadesusuarios/actividadesusuarios.service';
import { TokenService } from 'src/app/services/seguridad/token.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles-actividad',
  templateUrl: './detalles-actividad.component.html',
  styleUrls: ['./detalles-actividad.component.css']
})
export class DetallesActividadComponent {
  //recuperamos el id de la url 
  id: number = this.activateRouter.snapshot.params['id'];
  actividadesusuarios: Actividadusuario[];
  actividad: Actividad;
  usuarios: Usuario[];
  aus: Actividadusuario[];
  actividades: Actividad[];
  usuario: Usuario;
  actividadusuario: Actividadusuario;
  isAdmin = false;
  isLogged = false;
  isApuntado = false;
  email: string;
  isPasado = false;

  constructor(
    private activateRouter: ActivatedRoute,
    private router: Router,
    public usuariosService: UsuariosService,
    public actividadesService: ActividadesService,
    public actividadesUsuariosService: ActividadesusuariosService,
    private tokenService: TokenService,
    public fb: FormBuilder,
  ) { }

  ngOnInit() {

    this.actividadesService.getActividadId(this.id).subscribe(
      res => {
        this.actividad = res;
        //Comparamos la fecha de hoy con la fecha de la actividad para mostrar si estan disponibles o no
        const hoy = new Date();
        const diaActividad = new Date(this.actividad.fecha);
        if (hoy >= diaActividad) {
          this.isPasado = true;
        }
      },
      err => console.log(err)

    );

    //obtenemos el email del usuario registrado
    this.email = this.tokenService.getEmail();

    //recuperamos todas las actividadesusuario
    this.actividadesUsuariosService.getAllActividadesusuariosByActividad(this.id).subscribe(
      res => {
        this.actividadesusuarios = res;
        //Si el usuario está en la lista, cambiamos isAuntado a true
        for (var au of this.actividadesusuarios) {
          if (au.usuario.email === this.email) {
            this.isApuntado = true;
          }
        }
      },
      err => console.log(err)
    );

    //comprovamos si está registrado
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

    //comprobamos si es administrador
    if (this.tokenService.getAuthorities() === 'ADMIN') {
      this.isAdmin = true;
    }

    console.log(this.email);

  }

  irALaListaDeActividades() {
    this.router.navigate(['/actividades']);
  }

  //método tras pulsar botón apuntarse
  onClickApuntarse(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro que quiere apuntarse a esta actividad?',
      text: 'Rogamos compromiso con las actividades solicitadas',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmarApuntarse(id)
        swalWithBootstrapButtons.fire(
          '¡Está apuntado a esta actividad!',
          'Muchas gracias por su interés',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Ha cancelado la solicitud para apuntarse',
          'error'
        )
      }
    })
  }

  confirmarApuntarse(id: number) {
    let params = new HttpParams()
      .set('userEmail', this.email)
      .set('idActividad', id);
    this.actividadesUsuariosService.saveActividadWithEmail(params).subscribe(
      error => { console.error(error) }
    );
    this.irALaListaDeActividades();
  }


  //método tras pulsar botón desapuntarse
  onClickDesapuntarse(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro que quiere desapuntarse de esta actividad?',
      text: 'Rogamos compromiso con las actividades solicitadas',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmarDesapuntarse(id)
        swalWithBootstrapButtons.fire(
          '¡Se ha desapuntado de esta actividad!',
          'Muchas gracias',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Ha cancelado la solicitud para apuntarse',
          'error'
        )
      }
    })
  }

  confirmarDesapuntarse(id: number) {
    this.actividadesUsuariosService.deleteActividadusuario(id).subscribe(
      error => { console.error(error) }
    );
    this.irALaListaDeActividades();
  }

}
