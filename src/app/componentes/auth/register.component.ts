import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/models/login/nuevo-usuario';
import { AuthService } from 'src/app/services/seguridad/auth.service';
import { TokenService } from 'src/app/services/seguridad/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isLogged = false;
  isRegistered= false;
  isRegisterFail = false;
  nuevoUsuario : NuevoUsuario;
  userEmail: string;
  contrasenia: string;
  nombre: string;
  apellidos: string;
  rol : string;
  dni : string;
  errMsg : string;
  public registerForm: FormGroup;

   constructor (
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    public fb: FormBuilder,
   ){}

  ngOnInit(): void {
    //comprobamos si está logueado
    if (this.tokenService.getToken()) {
      this.isLogged=true;
    }

     //formulario reactivo
     this.registerForm = this.fb.group({
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      userEmail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onRegister(): void {
    this.nuevoUsuario = new NuevoUsuario(this.nombre,this.apellidos,this.userEmail,this.dni,this.contrasenia);
    this.authService.nuevo(this.nuevoUsuario).subscribe(
      data => {
        this.isRegistered = true;
        this.isRegisterFail = false;
        this.router.navigate(['/login']);
      },
      err => {
        this.isRegistered = false;
        this.isRegisterFail = true;
        this.errMsg = err.error.msg;
      }

    )
  }
   
}
