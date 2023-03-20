import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Cita } from 'src/app/models/cita/cita';
import { CitasService } from 'src/app/services/citas/citas.service';
import { TokenService } from 'src/app/services/seguridad/token.service';
//ventanas emegentes
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-citas',
  templateUrl: './listar-mis-citas.component.html',
  styleUrls: ['./listar-mis-citas.component.css']
})
export class ListarMisCitasComponent {

  citas: Cita[];
  cita: Cita;
  isAdmin = false;

  constructor(
    public fb: FormBuilder,
    public citasService: CitasService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.obtenerCitas();

    //comprobamos si es admin
    if (this.tokenService.getAuthorities() === 'ADMIN') {
      this.isAdmin = true;
    }
  }

  private obtenerCitas() {
    let params = new HttpParams()
      .set('userEmail', this.tokenService.getEmail());
    this.citasService.getAllCitasUsuario(params).subscribe(
      dato => {
        this.citas = dato;
      });
  }

  onClickConfirmarEliminarCita(id: number) {
    this.citasService.deleteCita(id).subscribe(
      citas => this.citas = this.citas.filter(c => c.id !== id)
    );
  }

  onClickEliminarCita(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro que quiere eliminar esta actividad?',
      text: "¡Esta acción es irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.onClickConfirmarEliminarCita(id)
        swalWithBootstrapButtons.fire(
          '¡Eliminado!',
          'Esta cita ha sido eliminada de la base de datos',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'La cita no se ha eliminado',
          'error'
        )
      }
    })
  }
}
