import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../products/products.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private base = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  getProducts(limit = 50): Observable<Product[]> {
    return this.http.get<{ products: Product[] }>(`${this.base}?limit=${limit}`)
      .pipe(map(res => res.products));
  }


  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.base}/${id}`);
  }

  createProduct(payload: Partial<Product>): Observable<any> {
    return this.http.post(`${this.base}/add`, payload);
  }

  // editar producto
  updateProduct(id: number, payload: Partial<Product>): Observable<any> {
    return this.http.put(`${this.base}/${id}`, payload);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
