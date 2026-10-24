import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  nombre: string = '';
  email: string = '';
  password: string = '';
  rolSeleccionado: 'admin' | 'estandar' = 'estandar';

  private authService = inject(AuthService);
  private router = inject(Router);

  async registrar() {
    if (!this.nombre || !this.email || !this.password) {
      alert('Por favor, llena todos los campos');
      return;
    }

    try {
      // Creamos el usuario real en Firebase
      await this.authService.registrar(this.email, this.password);
      alert('¡Registro exitoso! Bienvenido ' + this.nombre);
      
   
      if (this.rolSeleccionado === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/catalogo']);
      }
    } catch (error: any) {
      alert('Error al registrar: ' + error.message);
    }
  }
}