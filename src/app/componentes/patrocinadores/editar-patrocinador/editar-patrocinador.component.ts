import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Patrocinador } from 'src/app/models/patrocinador/patrocinador';
import { CitasService } from 'src/app/services/citas/citas.service';
import { StorageService } from 'src/app/services/firebase/storage.service';
import { PatrocinadoresService } from 'src/app/services/patrocinadores/patrocinadores.service';
//ventanas emegentes
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-patrocinador',
  templateUrl: './editar-patrocinador.component.html',
  styleUrls: ['./editar-patrocinador.component.css']
})
export class EditarPatrocinadorComponent {
  //recuperamos el id de la url 
  //id:number=parseInt(window.location.pathname.substr(0).split('/')[2]);
  id:number=this.activateRouter.snapshot.params['id'];
  patrocinador:Patrocinador=new Patrocinador();
  public patrocinadoresForm: FormGroup;

  constructor(
    private activateRouter: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder,
    public patrocinadoresService : PatrocinadoresService,
    public citasService : CitasService,
       // imagenes firebase
       private storageService: StorageService
  ) { }
  ngOnInit() {

    //asignamos al objeto animal los datos enviando el id recuperado
    this.patrocinadoresService.getPatrocinadorId(this.id).subscribe(
      res=>{ this.patrocinador=res},
      err=>console.log(err)
    );

    this.patrocinadoresForm = this.fb.group({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      imagen: new FormControl(''),

    });
  }  

  guardarPatrocinador(patrocinador : Patrocinador){
    console.log(patrocinador)
    this.patrocinadoresService.updatePatrocinador(patrocinador)
    .subscribe(dato => {
      Swal.fire('Patrocinador editado con éxito');
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
