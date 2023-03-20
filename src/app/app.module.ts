// estructura la aplicacion
import { NgModule } from '@angular/core';

// componentes
import { AppComponent } from './app.component';
import { DetallesActividadComponent } from './componentes/actividades/detalles-actividad/detalles-actividad.component';
import { MiPerfilComponent } from './componentes/mi-perfil/mi-perfil.component';
import { RegisterComponent } from './componentes/auth/register.component';
import { RegistrarCitaComponent } from './componentes/citas/registrar-cita/registrar-cita.component';
import { ListarMisCitasComponent } from './componentes/citas/listar-mis-citas/listar-mis-citas.component';
import { DetallesAnimalComponent } from './componentes/animales/detalles-animal/detalles-animal.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { LoginComponent } from './componentes/auth/login.component';
import { ListarAnimalesComponent } from './componentes/animales/listar-animales/listar-animales.component';
import { RegistrarAnimalComponent } from './componentes/animales/registrar-animal/registrar-animal.component';
import { EditarAnimalComponent } from './componentes/animales/editar-animal/editar-animal.component';
import { ListarCitasComponent } from './componentes/citas/listar-citas/listar-citas.component';
import { EditarCitaComponent } from './componentes/citas/editar-cita/editar-cita.component';
import { ListarUsuariosComponent } from './componentes/usuarios/listar-usuarios/listar-usuarios.component';
import { EditarUsuarioComponent } from './componentes/usuarios/editar-usuario/editar-usuario.component';
import { ListarRolesComponent } from './componentes/roles/listar-roles/listar-roles.component';
import { EditarRolComponent } from './componentes/roles/editar-rol/editar-rol.component';
import { RegistrarRolComponent } from './componentes/roles/registrar-rol/registrar-rol.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { EditarPatrocinadorComponent } from './componentes/patrocinadores/editar-patrocinador/editar-patrocinador.component';
import { ListarPatrocinadoresComponent } from './componentes/patrocinadores/listar-patrocinadores/listar-patrocinadores.component';
import { RegistrarPatrocinadorComponent } from './componentes/patrocinadores/registrar-patrocinador/registrar-patrocinador.component';
import { ListarActividadesComponent } from './componentes/actividades/listar-actividades/listar-actividades.component';
import { EditarActividadComponent } from './componentes/actividades/editar-actividad/editar-actividad.component';
import { RegistrarActividadComponent } from './componentes/actividades/registrar-actividad/registrar-actividad.component';
import { CarruselComponent } from './componentes/carrusel/carrusel.component';
import { PieComponent } from './componentes/pie/pie.component';
import { BarraNavegacionComponent } from './componentes/barra-navegacion/barra-navegacion.component';
import { RegistrarUsuarioComponent } from './componentes/usuarios/registrar-usuario/registrar-usuario.component';

// primeng
import { TableModule } from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {InputTextModule} from 'primeng/inputtext';
import {MenubarModule} from 'primeng/menubar';

//carrusel
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgImageSliderModule } from 'ng-image-slider';

//seguridad
import { interceptorProvider } from './services/interceptors/prod-interceptor.service';

//bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//formularios 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, createApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 


//enrutamiento
import { AppRoutingModule } from './app-routing.module';

//enlace api
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    ListarAnimalesComponent,
    RegistrarAnimalComponent,
    EditarAnimalComponent,
    ListarCitasComponent,
    EditarCitaComponent,
    RegistrarCitaComponent,
    ListarUsuariosComponent,
    EditarUsuarioComponent,
    ListarRolesComponent,
    EditarRolComponent,
    RegistrarRolComponent,
    InicioComponent,
    EditarPatrocinadorComponent,
    ListarPatrocinadoresComponent,
    RegistrarPatrocinadorComponent,
    ListarActividadesComponent,
    EditarActividadComponent,
    RegistrarActividadComponent,
    CarruselComponent,
    PieComponent,
    BarraNavegacionComponent,
    ListarMisCitasComponent,
    ContactoComponent,
    LoginComponent,
    RegisterComponent,
    DetallesAnimalComponent,
    MiPerfilComponent,
    DetallesActividadComponent,
    RegistrarUsuarioComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgImageSliderModule,
    MatSlideToggleModule,
    TableModule,
    ButtonModule,
    PanelModule,
    InputTextModule,
    MenubarModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
