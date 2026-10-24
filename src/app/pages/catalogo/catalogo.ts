import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ProductoService, Producto } from '../../services/producto';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css']
})
export class CatalogoComponent implements OnInit {
  productos: Producto[] = [];
  cargando: boolean = true;
  errorMsg: string = '';

  private productoService = inject(ProductoService);
  private authService = inject(AuthService);
  private cdRef = inject(ChangeDetectorRef); 

  ngOnInit() {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.cargando = false;
        this.cdRef.detectChanges(); 
      },
      error: (err) => {
        console.error('Error de Firebase:', err);
        this.cargando = false;
        this.cdRef.detectChanges();
      }
    });
  }

  cerrarSesion() {
    this.authService.logout();
  }
}