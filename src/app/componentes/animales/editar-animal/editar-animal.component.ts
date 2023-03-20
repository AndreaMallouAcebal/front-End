import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from 'src/app/models/animal/animal';
import { Cita } from 'src/app/models/cita/cita';
import { AnimalesService } from 'src/app/services/animales/animales.service';
import { CitasService } from 'src/app/services/citas/citas.service';
import { StorageService } from '../../../services/firebase/storage.service';
//ventanas emegentes
import Swal from 'sweetalert2';


@Component({
  selector: 'app-editar-animal',
  templateUrl: './editar-animal.component.html',
  styleUrls: ['./editar-animal.component.css']
})
export class EditarAnimalComponent {
  //recuperamos el id de la url 
  id:number=this.activateRouter.snapshot.params['id'];
  animal:Animal=new Animal();
  citas: Cita[]=[];
  public animalesForm: FormGroup;

  constructor(
    private activateRouter: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder,
    public animalesService : AnimalesService,
    public citasService : CitasService,
     // imagenes firebase
     private storageService: StorageService
  ) { }
  ngOnInit() {

    //cargamos las citas
    this.citasService.getAllCitas().subscribe(dato=>{
      this.citas = dato;
    });

    //guardamos las citas que tiene el animal
    this.citas=this.citas.filter(c=>c.animal.id=this.id)

    //asignamos al objeto animal los datos enviando el id recuperado
    this.animalesService.getAnimalId(this.id).subscribe(
      res=>{ this.animal=res},
      err=>console.log(err)
    );

    this.animalesForm = this.fb.group({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      edad: new FormControl('', [Validators.required, Validators.min(0), Validators.max(30)]),
      raza:  new FormControl('', [Validators.required, Validators.maxLength(30)]),
      descripcion:  new FormControl('', [Validators.required, Validators.maxLength(150)]),
      imagen:  new FormControl('', [Validators.required]),
      tipo:  new FormControl('', [Validators.required, Validators.maxLength(45)]),
    });
  }

  guardarAnimal(animal : Animal){
    this.animalesService.updateAnimal(animal).subscribe(dato => {
      Swal.fire('Animal editado con exito')
      this.animalesForm.reset();
      this.irALaListaDeAnimales();
    },
      error => { console.error(error) }

    );
  }
  irALaListaDeAnimales() {
    this.router.navigate(['/animales']);
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
      this.storageService.subirImagen(this.animal.nombre +'_' + Date.now() , reader.result).then(urlImagen=>{
        //añadimos la url al campo imagen
       this.animal.imagen=""+urlImagen
      })
    }

  }


}
