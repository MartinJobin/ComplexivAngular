import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, deleteDoc, addDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Producto {
  id?: string;
  nombre: string;
  precio: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private firestore = inject(Firestore);

  getProductos(): Observable<Producto[]> {
    const productosCollection = collection(this.firestore, 'productos');
    return collectionData(productosCollection, { idField: 'id' }) as Observable<Producto[]>;
  }

  addProducto(producto: Producto) {
    const productosCollection = collection(this.firestore, 'productos');
    return addDoc(productosCollection, producto);
  }

  updateProducto(id: string, producto: Producto) {
    const productoDoc = doc(this.firestore, `productos/${id}`);
    return updateDoc(productoDoc, { ...producto });
  }

  deleteProducto(id: string) {
    const productoDoc = doc(this.firestore, `productos/${id}`);
    return deleteDoc(productoDoc);
  }
}