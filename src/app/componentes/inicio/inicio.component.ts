import { Component } from '@angular/core';
import { Animal } from 'src/app/models/animal/animal';
import { Patrocinador } from 'src/app/models/patrocinador/patrocinador';
import { AnimalesService } from 'src/app/services/animales/animales.service';
import { PatrocinadoresService } from 'src/app/services/patrocinadores/patrocinadores.service';
import { TokenService } from 'src/app/services/seguridad/token.service';
//ventanas emegentes
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  animales: Animal[] = [];
  patrocinadores: Patrocinador[] = [];
  isAdmin = false;

  constructor(
    private animalesService: AnimalesService,
    private patrocinadoresService: PatrocinadoresService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.obtenerAnimales();
    this.obtenerPatrocinadores();
    if (this.tokenService.getAuthorities() === 'ADMIN') {
      this.isAdmin = true;
    }
  }
 //llenamos el array animales con la base de datos
  obtenerAnimales() {
    this.animalesService.getAnimalId(1).subscribe(dato =>
      this.animales.push(dato)
    );
    this.animalesService.getAnimalId(2).subscribe(dato =>
      this.animales.push(dato)
    );
    this.animalesService.getAnimalId(3).subscribe(dato =>
      this.animales.push(dato)
    );
  }

  //llenamos el array patrocinadores con la base de datos
  obtenerPatrocinadores() {
    this.patrocinadoresService.getAllPatrocinadores().subscribe(dato =>
      this.patrocinadores = dato
    );
  }

  //llamamos a la ventana emergente para confirmar la eliminación
  onClickEliminarAnimal(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: '¿Está seguro que quiere eliminar este animal?',
      text: "¡Esta acción es irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.onClickConfirmarEliminarAnimal(id)
        swalWithBootstrapButtons.fire(
          '¡Eliminado!',
          'Este animal ha sido eliminada de la base de datos',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El animal no se ha eliminado',
          'error'
        )
      }
    })

  }
  //Eliminamos el animal
  onClickConfirmarEliminarAnimal(id: number) {
    this.animalesService.deleteAnimal(id).subscribe(
      animales => this.animales = this.animales.filter(ani => ani.id !== id),

    );
  }

  //llamamos a la ventana emergente para confirmar la eliminación
  onClickEliminarPatrocinador(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro que quiere eliminar este patrocinador?',
      text: "¡Esta acción es irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.onClickConfirmarEliminarAnimal(id)
        swalWithBootstrapButtons.fire(
          '¡Eliminado!',
          'Este patrocinador ha sido eliminada de la base de datos',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El patrocinador no se ha eliminado',
          'error'
        )
      }
    })
  }

  //Eliminamos el patrocinador
  onClickConfirmarEliminarPatrocinador(id: number) {
    this.patrocinadoresService.deletePatrocinador(id).subscribe(
      patrocinadores => this.patrocinadores = this.patrocinadores.filter(p => p.id !== id),
    );
  }

}
