import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { environment } from 'src/environments/environment';

//inicializamos firebase y le pasamos el archivo de configuracion
firebase.initializeApp(environment.firebaseConfig)

// import { ref, Storage, uploadBytes } from '@angular/fire/storage';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    storageRef = firebase.app().storage().ref();
    constructor() {

    }
    async subirImagen(nombre: String, imgBase64: any) {
        try {
            let respuesta=await this.storageRef.child("img/"+nombre).putString(imgBase64, 'data_url')
            console.log(respuesta);
            return await respuesta.ref.getDownloadURL();
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}