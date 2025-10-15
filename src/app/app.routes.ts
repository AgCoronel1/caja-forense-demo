import { Routes } from '@angular/router';
import { About } from './about/about';
import { ProductsDetail } from './products/products-detail/products-detail';
import { ProductsList } from './products/products-list/products-list';

export const routes: Routes = [
    { path: '', redirectTo: 'productos', pathMatch: 'full' },
    { path: 'productos', component: ProductsList },
    { path: 'productos/:id', component: ProductsDetail },
    { path: 'acerca', component: About},
];