export class NuevoUsuario{
    nombre : string;
    apellidos: string;
    email : string;
    dni : string;
    contrasenia: string;

    constructor(nombre: string, apellidos: string, email: string, dni: string, contrasenia: string) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.dni = dni
        this.contrasenia = contrasenia;
    }
}