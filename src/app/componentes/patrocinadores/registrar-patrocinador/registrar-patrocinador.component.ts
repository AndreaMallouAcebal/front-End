import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patrocinador } from 'src/app/models/patrocinador/patrocinador';
import { StorageService } from 'src/app/services/firebase/storage.service';
import { PatrocinadoresService } from 'src/app/services/patrocinadores/patrocinadores.service';
//ventanas emegentes
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-patrocinador',
  templateUrl: './registrar-patrocinador.component.html',
  styleUrls: ['./registrar-patrocinador.component.css']
})
export class RegistrarPatrocinadorComponent {
  patrocinador:Patrocinador=new Patrocinador();
  public patrocinadoresForm: FormGroup;


  constructor(
    private router: Router,
    public fb: FormBuilder,
    public patrocinadoresService : PatrocinadoresService,
        // imagenes firebase
        private storageService: StorageService
  ) { }
  ngOnInit() {

    this.patrocinadoresForm = this.fb.group({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      imagen: new FormControl('', [Validators.required]),
    });
  }

  guardarPatrocinador(){
    this.patrocinadoresService.savePatrocinador(this.patrocinadoresForm.value).subscribe(dato => {
      Swal.fire('Patrocinador registrado con éxito');
      this.patrocinadoresForm.reset();
      this.irAInicio();
    },
      error => { console.error(error) }

    );
  }
  irAInicio() {
    this.router.navigate(['/inicio']);
  }

  onSubmit(): void {
    this.guardarPatrocinador();
  }

  imagenes:any=[];
  //*******************imagenes********/
  uploadImage(event:any){
     const file=event.target.files[0];
     console.log(file);
    let reader= new FileReader();
    reader.readAsDataURL(file)

    reader.onloadend=()=>{
      console.log(reader.result);
      this.imagenes.push(reader.result);
      this.storageService.subirImagen(this.patrocinador.nombre +'_' + Date.now() , reader.result).then(urlImagen=>{
        console.log(urlImagen)
       this.patrocinador.imagen=""+urlImagen
       console.log(this.patrocinador.imagen)
      })
    }

  }
}
