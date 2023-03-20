import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Animal } from 'src/app/models/animal/animal';
import { AnimalesService } from 'src/app/services/animales/animales.service';

//ventanas emegentes
import Swal from 'sweetalert2';
import { StorageService } from '../../../services/firebase/storage.service';
@Component({
  selector: 'app-registrar-animal',
  templateUrl: './registrar-animal.component.html',
  styleUrls: ['./registrar-animal.component.css']
})
export class RegistrarAnimalComponent {
animal:Animal=new Animal();
  public animalesForm: FormGroup;

  constructor(
    private router: Router,
    public fb: FormBuilder,
    public animalesService : AnimalesService,
    // imagenes firebase
    private storageService: StorageService
  ) { }
  ngOnInit() {

    this.animalesForm = this.fb.group({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      edad: new FormControl('', [Validators.required, Validators.min(0), Validators.max(30)]),
      raza:  new FormControl('', [Validators.required, Validators.maxLength(30)]),
      descripcion:  new FormControl('', [Validators.required, Validators.maxLength(150)]),
      tipo:  new FormControl('', [Validators.required, Validators.maxLength(45)]),
      imagen: new FormControl('')
    });
  }

  guardarAnimal(){
    console.log("imagen",this.animal.imagen)
    console.log("animal",this.animal)
    this.animalesService.saveAnimal(this.animalesForm.value).subscribe(dato => {
      Swal.fire('Animal guardado con éxito');
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
    this.guardarAnimal();
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
        console.log(urlImagen)
       this.animal.imagen=""+urlImagen
       console.log(this.animal.imagen)
      })
    }

  }

}
