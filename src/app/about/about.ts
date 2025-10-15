import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../shared/shared-imports';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {
  nombre = 'Agustín Coronel';
  puesto = 'Desarrollador Fullstack';
  empresa = 'Caja Forense';
  email = 'acoronel961@gmail.com';
  foto = 'assets/mi-foto.jpg';
  descripcion = 'Desarrollador de aplicaciones web y móviles, experiencia en  soluciones front-end utilizando Angular, resolviendo el back-end en .NET . Esta demo fue realizada para Caja Forense dentro del contexto de una entrevista técnica.';

  telefono = '+54 9 341 3759350';
  ciudad = 'Rosario, Argentina';
  linkedin = 'https://www.linkedin.com/in/agcoronel/';
 
}
