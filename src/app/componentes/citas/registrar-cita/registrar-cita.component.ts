import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Animal } from 'src/app/models/animal/animal';
import { Cita } from 'src/app/models/cita/cita';
import { Usuario } from 'src/app/models/usuario/usuario';
import { AnimalesService } from 'src/app/services/animales/animales.service';
import { CitasService } from 'src/app/services/citas/citas.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
//ventanas emegentes
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-cita',
  templateUrl: './registrar-cita.component.html',
  styleUrls: ['./registrar-cita.component.css']
})
export class RegistrarCitaComponent {
  cita:Cita=new Cita();
  public citasForm: FormGroup;
  usuarios:Usuario[];
  usuario:Usuario;
  animales:Animal[];
  animal:Animal;

  constructor(
    private router: Router,
    public fb: FormBuilder,
    public citasService : CitasService,
    public usuariosService : UsuariosService,
    public animalesService : AnimalesService
  ) { }

  ngOnInit() {
    this.obtenerAnimales();
    this.obtenerUsuarios();

    this.citasForm = this.fb.group({
      fecha: new FormControl('', [Validators.required]),
      animal_id: new FormControl('', [Validators.required]),
      usuario_id:new FormControl('', [Validators.required]),
    });
  }

  guardarCita(){

    this.citasService.saveCita(this.cita).subscribe(dato => {
      Swal.fire('Cita registrada con éxito');
      this.citasForm.reset();
      this.irALaListaDeCitas();
    },
      error => { console.error(error) }

    );
}

  setUsuarioCita(){
    this.cita.usuario=this.usuario;
  }
  
  setAnimalCita(){
    this.cita.animal=this.animal;
  }

  irALaListaDeCitas() {
    this.router.navigate(['/citas']);
  }

  private obtenerUsuarios(){
    this.usuariosService.getAllUsuarios().subscribe(usuarios=>{
      this.usuarios = usuarios;
    });
  }

  private obtenerAnimales(){
    this.animalesService.getAllAnimales().subscribe(dato=>{
      this.animales = dato;
    });
  }
  

  onSubmit(): void {
    this.guardarCita();
  }
}
