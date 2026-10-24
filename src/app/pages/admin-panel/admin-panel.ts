import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto, ProductoService } from '../../services/producto';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css'
})
export class AdminPanel implements OnInit {
  private productoService = inject(ProductoService);
  private authService = inject(AuthService);
  private router = inject(Router);

  productos: Producto[] = [];
  nuevoProducto: Producto = { nombre: '', precio: 0 };
  editando: boolean = false;
  idEditando: string | null = null;

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        console.log('Productos cargados:', data);
      },
      error: (err) => {
        console.error('Error al cargar:', err);
        alert('Error al cargar de Firebase. Revisa la consola (F12).');
      }
    });
  }

  guardarProducto() {
  
    const precioNumerico = Number(this.nuevoProducto.precio);
    const nombreLimpio = this.nuevoProducto.nombre ? this.nuevoProducto.nombre.trim() : '';

    console.log('Intentando guardar:', { nombre: nombreLimpio, precio: precioNumerico });

    if (!nombreLimpio || isNaN(precioNumerico) || precioNumerico <= 0) {
      alert('Por favor, ingresa un nombre y un precio válido.');
      return;
    }

    const productoAGuardar: Producto = {
      nombre: nombreLimpio,
      precio: precioNumerico
    };

    if (this.editando && this.idEditando !== null) {

      this.productoService.updateProducto(this.idEditando, productoAGuardar).then(() => {
        this.cargarProductos();
        this.limpiarFormulario();
      }).catch(err => alert('Error al actualizar: ' + err.message));
    } else {
 
      this.productoService.addProducto(productoAGuardar).then(() => {
        this.cargarProductos();
        this.limpiarFormulario();
      }).catch(err => alert('Error al guardar: ' + err.message));
    }
  }

  editarProducto(prod: Producto) {
    this.nuevoProducto = { nombre: prod.nombre, precio: prod.precio };
    this.editando = true;
    this.idEditando = prod.id!; 
  }

  eliminarProducto(id: string | undefined) {
    if (id && confirm('¿Seguro que deseas eliminar este producto?')) {
      this.productoService.deleteProducto(id).then(() => {
        this.cargarProductos();
      }).catch(err => alert('Error al eliminar: ' + err.message));
    }
  }

  limpiarFormulario() {
    this.nuevoProducto = { nombre: '', precio: 0 };
    this.editando = false;
    this.idEditando = null;
  }

  cerrarSesion() {
    this.authService.logout();
  }
}