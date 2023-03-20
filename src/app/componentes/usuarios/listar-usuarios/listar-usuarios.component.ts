import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Cita } from 'src/app/models/cita/cita';
import { Usuario } from 'src/app/models/usuario/usuario';
import { CitasService } from 'src/app/services/citas/citas.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
//ventanas emegentes
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent {

  usuarios:Usuario[];
  usuario :Usuario;
  citas:Cita[];
  constructor(
    public fb: FormBuilder,
    public usuariosService : UsuariosService,
    public citasService : CitasService
  ){}

  ngOnInit(): void{
    this.obtenerUsuarios();
  }

  private obtenerUsuarios(){
    this.usuariosService.getAllUsuarios().subscribe(dato=>{
      this.usuarios = dato;
    });
  }

  onClickConfirmarEliminarUsuario(id:number){
    this.usuariosService.deleteUsuario(id).subscribe(
      usuarios=> this.usuarios= this.usuarios.filter(u=>u.id!==id)
    );
  }

  onClickEliminarUsuario(id:number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Está seguro que quiere eliminar este usuario?',
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
          'Este usuario ha sido eliminada de la base de datos',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Este usuario no se ha eliminado',
          'error'
        )
      }
    })
    
  }
}
