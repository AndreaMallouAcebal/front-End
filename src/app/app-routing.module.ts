import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetallesActividadComponent } from './componentes/actividades/detalles-actividad/detalles-actividad.component';
import { EditarActividadComponent } from './componentes/actividades/editar-actividad/editar-actividad.component';
import { ListarActividadesComponent } from './componentes/actividades/listar-actividades/listar-actividades.component';
import { RegistrarActividadComponent } from './componentes/actividades/registrar-actividad/registrar-actividad.component';
import { DetallesAnimalComponent } from './componentes/animales/detalles-animal/detalles-animal.component';
import { EditarAnimalComponent } from './componentes/animales/editar-animal/editar-animal.component';
import { ListarAnimalesComponent } from './componentes/animales/listar-animales/listar-animales.component';
import { RegistrarAnimalComponent } from './componentes/animales/registrar-animal/registrar-animal.component';
import { LoginComponent } from './componentes/auth/login.component';
import { RegisterComponent } from './componentes/auth/register.component';
import { EditarCitaComponent } from './componentes/citas/editar-cita/editar-cita.component';
import { ListarCitasComponent } from './componentes/citas/listar-citas/listar-citas.component';
import { ListarMisCitasComponent } from './componentes/citas/listar-mis-citas/listar-mis-citas.component';
import { RegistrarCitaComponent } from './componentes/citas/registrar-cita/registrar-cita.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { MiPerfilComponent } from './componentes/mi-perfil/mi-perfil.component';
import { EditarPatrocinadorComponent } from './componentes/patrocinadores/editar-patrocinador/editar-patrocinador.component';
import { ListarPatrocinadoresComponent } from './componentes/patrocinadores/listar-patrocinadores/listar-patrocinadores.component';
import { RegistrarPatrocinadorComponent } from './componentes/patrocinadores/registrar-patrocinador/registrar-patrocinador.component';
import { EditarRolComponent } from './componentes/roles/editar-rol/editar-rol.component';
import { ListarRolesComponent } from './componentes/roles/listar-roles/listar-roles.component';
import { RegistrarRolComponent } from './componentes/roles/registrar-rol/registrar-rol.component';
import { EditarUsuarioComponent } from './componentes/usuarios/editar-usuario/editar-usuario.component';
import { ListarUsuariosComponent } from './componentes/usuarios/listar-usuarios/listar-usuarios.component';
import { RegistrarUsuarioComponent } from './componentes/usuarios/registrar-usuario/registrar-usuario.component';
import { ProdGuardsService as guard } from './services/guards/prod-guards.service';

const routes: Routes = [
  {
    path: 'inicio', component: InicioComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: '', redirectTo:'inicio', pathMatch:'full'
  },
  {
    path: 'animales', component: ListarAnimalesComponent
  },
  {
    path: 'registrar-animal', component: RegistrarAnimalComponent, canActivate: [guard], data: {expectedRol: ['ADMIN']}
  },
  {
    path: 'animales/:id', component: EditarAnimalComponent, canActivate: [guard], data: {expectedRol: ['ADMIN']}
  },
  {
    path: 'detalles-animal/:id', component: DetallesAnimalComponent
  },
  {
    path: 'detalles-actividad/:id', component: DetallesActividadComponent
  },
  {
    path: 'citas', component: ListarCitasComponent
  },
  {
    path: 'mis-citas', component: ListarMisCitasComponent
  },
  {
    path: 'registrar-cita', component: RegistrarCitaComponent, canActivate: [guard], data: {expectedRol: ['ADMIN']}
  },
  {
    path: 'citas/:id', component: EditarCitaComponent, canActivate: [guard], data: {expectedRol: ['ADMIN']}
  },
  {
    path: 'usuarios', component: ListarUsuariosComponent, canActivate: [guard], data: {expectedRol: ['ADMIN']}
  },
  {
    path: 'usuarios/:id', component: EditarUsuarioComponent, canActivate: [guard], data: {expectedRol: ['ADMIN','USER']}
  },
  {
    path: 'registrar-usuario', component: RegistrarUsuarioComponent, canActivate: [guard], data: {expectedRol: ['ADMIN']}
  },
  {
    path: 'roles', component: ListarRolesComponent, canActivate: [guard], data: {expectedRol: ['ADMIN']}
  },
  {
    path: 'registrar-rol', component: RegistrarRolComponent, canActivate: [guard], data: {expectedRol: ['ADMIN']}
  },
  {
    path: 'roles/:id', component: EditarRolComponent, canActivate: [guard], data: {expectedRol: ['ADMIN']}
  },
  {
    path: 'patrocinadores', component: ListarPatrocinadoresComponent, canActivate: [guard], data: {expectedRol: ['ADMIN']}
  },
  {
    path: 'registrar-patrocinador', component: RegistrarPatrocinadorComponent, canActivate: [guard], data: {expectedRol: ['ADMIN']}
  },
  {
    path: 'patrocinadores/:id', component: EditarPatrocinadorComponent, canActivate: [guard], data: {expectedRol: ['ADMIN']}
  },
  {
    path: 'actividades', component: ListarActividadesComponent
  },
  {
    path: 'registrar-actividad', component: RegistrarActividadComponent, canActivate: [guard], data: {expectedRol: ['ADMIN']}
  },
  {
    path: 'actividades/:id', component: EditarActividadComponent, canActivate: [guard], data: {expectedRol: ['ADMIN']}
  },
  {
    path: 'contacto', component: ContactoComponent
  },
  {
    path: 'mi-perfil', component: MiPerfilComponent ,canActivate: [guard], data: {expectedRol: ['ADMIN','USER']}
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
