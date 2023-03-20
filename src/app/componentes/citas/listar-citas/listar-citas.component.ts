import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Cita } from 'src/app/models/cita/cita';
import { CitasService } from 'src/app/services/citas/citas.service';
//ventanas emegentes
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-citas',
  templateUrl: './listar-citas.component.html',
  styleUrls: ['./listar-citas.component.css']
})
export class ListarCitasComponent {

  citas: Cita[];
  cita: Cita;
  
  constructor(
    public fb: FormBuilder,
    public citasService: CitasService
  ) { }

  ngOnInit(): void {
    this.obtenerCitas();
  }

  private obtenerCitas() {
    this.citasService.getAllCitas().subscribe(dato => {
      this.citas = dato;
      console.log(this.citas);
    });
  }

  onClickConfirmarEliminarCita(id:number){
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
      title: '¿Está seguro que quiere eliminar esta cita?',
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
