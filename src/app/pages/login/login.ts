import { Component, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html', 
  styleUrls: ['./login.css']   
})
export class LoginComponent {
  email = '';
  password = '';
  errorMsg = '';
  
  private auth = inject(Auth);
  private router = inject(Router);

  async login() {
    try {
      await signInWithEmailAndPassword(this.auth, this.email, this.password);
      this.router.navigate(['/catalogo']); 
    } catch (error) {
      this.errorMsg = 'Correo o contraseña incorrectos.';
    }
  }
}