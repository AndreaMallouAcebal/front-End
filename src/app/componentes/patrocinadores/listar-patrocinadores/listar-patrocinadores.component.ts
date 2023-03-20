import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Patrocinador } from 'src/app/models/patrocinador/patrocinador';
import { PatrocinadoresService } from 'src/app/services/patrocinadores/patrocinadores.service';
import { TokenService } from 'src/app/services/seguridad/token.service';
//ventanas emegentes
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-patrocinadores',
  templateUrl: './listar-patrocinadores.component.html',
  styleUrls: ['./listar-patrocinadores.component.css']
})
export class ListarPatrocinadoresComponent {
  patrocinadores:Patrocinador[];
  patrocinador:Patrocinador;
  isAdmin = false;
  
  constructor(
    public fb: FormBuilder,
    public patrocinadoresService : PatrocinadoresService,
    private tokenService: TokenService
  ){}

  ngOnInit(): void{
    this.obtenerPatrocinadores();

    if (this.tokenService.getAuthorities() === 'ADMIN') {
      this.isAdmin = true;
    }
  }

  private obtenerPatrocinadores(){
    this.patrocinadoresService.getAllPatrocinadores().subscribe(dato=>{
      this.patrocinadores = dato;
    });
  }

  onClickConfirmarEliminarPatrocinador(id:number){
    this.patrocinadoresService.deletePatrocinador(id).subscribe(
      patrocinadores=> this.patrocinadores= this.patrocinadores.filter(p=>p.id!==id)
    );
  }

  onClickEliminarPatrocinador(id:number){
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
        this.onClickConfirmarEliminarPatrocinador(id)
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




}
