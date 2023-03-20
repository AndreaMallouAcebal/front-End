import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from 'src/app/models/animal/animal';
import { Cita } from 'src/app/models/cita/cita';
import { Usuario } from 'src/app/models/usuario/usuario';
import { AnimalesService } from 'src/app/services/animales/animales.service';
import { CitasService } from 'src/app/services/citas/citas.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
//ventanas emegentes
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-cita',
  templateUrl: './editar-cita.component.html',
  styleUrls: ['./editar-cita.component.css']
})
export class EditarCitaComponent {
  //recuperamos el id de la url 
  //id:number=parseInt(window.location.pathname.substr(0).split('/')[2]);
  id: number = this.activateRouter.snapshot.params['id'];
  cita: Cita = new Cita();
  public citasForm: FormGroup;
  usuarios: Usuario[];
  usuario: Usuario;
  animales: Animal[];
  animal: Animal;

  constructor(
    private activateRouter: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder,
    public citasService: CitasService,
    public usuariosService: UsuariosService,
    public animalesService: AnimalesService
  ) { }
  ngOnInit() {
    //asignamos al objeto cita los datos enviando el id recuperado
    this.citasService.getCitaId(this.id).subscribe(
      dato => { this.cita = dato },
      err => console.log(err)
    );

    this.obtenerAnimales();
    this.obtenerUsuarios();

    this.citasForm = this.fb.group({
      fecha: new FormControl('', [Validators.required]),
      animal_id: new FormControl('', [Validators.required]),
      usuario_id:new FormControl('', [Validators.required]),
    });
  }

  guardarCita(cita: Cita) {
    this.citasService.updateCita(cita).subscribe(dato => {
      Swal.fire('Cita editada con éxito');
      this.citasForm.reset();
      this.irALaListaDeCitas();
    },
      error => { console.error(error) }

    );
  }
  irALaListaDeCitas() {
    this.router.navigate(['/citas']);
  }

 
  setUsuarioCita() {
    this.cita.usuario = this.usuario;
  }

  setAnimalCita() {
    this.cita.animal = this.animal;
  }

  private obtenerUsuarios() {
    this.usuariosService.getAllUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  private obtenerAnimales() {
    this.animalesService.getAllAnimales().subscribe(dato => {
      this.animales = dato;
    });
  }

  onSubmit(): void {

  }
}
