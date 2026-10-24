import { Injectable, inject } from '@angular/core';
import { Auth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);

  // Registro real en Firebase
  async registrar(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      throw error;
    }
  }


  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }


  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }
}