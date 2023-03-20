import { Rol } from "../rol/rol";


export class Usuario {
    id: number;
    nombre:string;
    apellidos:string;
    email:string;
    dni:string;
    contrasenia:string;
    rol: Rol;
    voluntario:boolean;
}
