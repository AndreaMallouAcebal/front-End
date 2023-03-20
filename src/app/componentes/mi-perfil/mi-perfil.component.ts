import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario/usuario';
import { TokenService } from 'src/app/services/seguridad/token.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent {
  usuario: Usuario;
  router: Router;

  constructor(
    private tokenService: TokenService,
    private usuarioService: UsuariosService
  ) { }
  ngOnInit() {
    this.obtenerDatosUsuario();
  }
  private obtenerDatosUsuario() {
    let params = new HttpParams()
      .set('userEmail', this.tokenService.getEmail());
    this.usuarioService.getMyUser(params).subscribe(
      dato => {
        this.usuario = dato;
      });
  }

  onClickConfirmarEliminarUsuario(id: number) {
    this.usuarioService.deleteUsuario(id).subscribe(
      dato =>{
      this.tokenService.logOut();
      window.location.reload();});
  }

  onClickEliminarUsuario(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro que quiere eliminar la cuenta?',
      text: "¡Esta acción es irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.onClickConfirmarEliminarUsuario(id)
        swalWithBootstrapButtons.fire(
          '¡Eliminado!',
          'La cuenta ha sido eliminada de la base de datos',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'La cuenta no se ha eliminado',
          'error'
        )
      }
    })
  }

  onLogOut(): void {
      this.tokenService.logOut();
      window.location.reload();
  }

  confirmarVoluntario(usuario : Usuario){
    usuario.voluntario = true;
    this.usuarioService.hacerVoluntario(usuario).subscribe(
      dato => {
        this.usuario = dato;
      }
    );
  }

  onVoluntario(usuario : Usuario) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro que quiere hacerse voluntario?',
      text: "Haciendose voluntario se está comprometiendo a dedicarnos una hora a la semana, ¿dispone de ese tiempo?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, quiero ser voluntario',
      cancelButtonText: 'No, lo he pensado mejor',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmarVoluntario(usuario)
        swalWithBootstrapButtons.fire(
          'Bienvenido!',
          'Se acaba de dar de alta como voluntario, pase por nuestra oficina para que podamos conocer su disponibilidad y proceder a la firma de papeles',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No se ha hecho voluntario',
          'error'
        )
      }
    })
  }
}
