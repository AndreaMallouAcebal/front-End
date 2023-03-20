import { Animal } from "../animal/animal";
import { Usuario } from "../usuario/usuario";

export class Cita {
        id: number;
        fecha:Date;
        animal:Animal;
        usuario:Usuario;
}
