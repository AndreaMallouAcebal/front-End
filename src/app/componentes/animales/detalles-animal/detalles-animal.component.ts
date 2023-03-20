import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from 'src/app/models/animal/animal';
import { Cita } from 'src/app/models/cita/cita';
import { Usuario } from 'src/app/models/usuario/usuario';
import { AnimalesService } from 'src/app/services/animales/animales.service';
import { CitasService } from 'src/app/services/citas/citas.service';
import { TokenService } from 'src/app/services/seguridad/token.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
//importamos las ventanas de alerta
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles-animal',
  templateUrl: './detalles-animal.component.html',
  styleUrls: ['./detalles-animal.component.css']
})
export class DetallesAnimalComponent {
  //recuperamos el id de la url 
  id: number = this.activateRouter.snapshot.params['id'];
  animal: Animal = new Animal();
  public animalesForm: FormGroup;
  cita: Cita = new Cita();
  public citasForm: FormGroup;
  usuario: Usuario;
  email:string;
  isLogged = false;


  constructor(
    private activateRouter: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder,
    public usuariosService: UsuariosService,
    public animalesService: AnimalesService,
    public citasService: CitasService,
    private tokenService: TokenService
  ) { }
  ngOnInit() {

    //asignamos al objeto animal los datos enviando el id recuperado
    this.animalesService.getAnimalId(this.id).subscribe(
      res => { this.animal = res },
      err => console.log(err)
    );

    this.animalesForm = this.fb.group({
      nombre: ['', Validators.required],
      edad: ['', Validators.required],
      raza: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: ['', Validators.required],
      tipo: ['', Validators.required],
    });

    this.citasForm = this.fb.group({
      fecha: ['', Validators.required],
      animal_id: [''],
      usuario_id: ['']
    });

    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else {
      this.isLogged = false;
    }
  }

  onclickConfirmarGuardarCita(){
    this.email = this.tokenService.getEmail();
    this.setAnimalCita();
    this.citasService.saveCitaWithEmail(this.cita, this.email).subscribe(
      data => {},
      error => { console.log(error.error) }
    );
    this.irALaListaDeAnimales();
  }


  onClickGuardarCita() {

    //creamos dos variables fecha para compararlas
    var fecha1 = new Date(Date.now());
    var fecha2=new Date(this.cita.fecha);

    //Si intentamos coger una fecha inferior a la actual 
    //muestra un mensaje de error
    if(fecha2.getTime()<fecha1.getTime()){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe de coger una fecha posterior a la actual'
      })

      //Si la fecha es correcta
    }else{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Está seguro que quiere crear una cita?',
      text: 'Rogamos compromiso con las citas solicitadas',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.onclickConfirmarGuardarCita()
        swalWithBootstrapButtons.fire(
          '¡Cita confirmada!',
          'Muchas gracias por su interés',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Esta cita ha sido cancelada',
          'error'
        )
      }
    })
  }
    
  }

  irALaListaDeAnimales() {
    this.router.navigate(['/animales']);
  }

  setAnimalCita() {
    this.cita.animal = this.animal;
  }

  onSubmit(): void {

  }

}
