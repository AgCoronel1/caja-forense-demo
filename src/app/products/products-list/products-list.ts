import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../products.model';
import { ProductService } from '../../_core/services/product.service';
import { ProductsDetail } from '../products-detail/products-detail';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { ProductsModal } from '../products-modal/products-modal';
import { SpinnerService } from '../../_core/services/spinner.service';


@Component({
  selector: 'app-products-list', 
  templateUrl: './products-list.html', 
  styleUrls: ['./products-list.scss'], 
  standalone: true,
  imports: [
    ...SHARED_IMPORTS
  ],

})
export class ProductsList implements OnInit {
  displayedColumns = ['id', 'thumbnail', 'title', 'price', 'stock', 'actions'];
  dataSource = new MatTableDataSource<Product>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private svc: ProductService, private dialog: MatDialog, private spinner: SpinnerService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.spinner.show();
    this.svc.getProducts(50).subscribe(products => {
      this.dataSource.data = products;
      this.dataSource.paginator = this.paginator;
      console.log(products)
      this.spinner.hide();
    });
  }

  verMas(product: Product) {
    this.spinner.show();  
    this.svc.getProduct(product.id).subscribe((res) => {
      this.dialog.open(ProductsDetail, { data: res });
      this.spinner.hide();
    }, err => {
      console.error(err);
      this.spinner.hide();
    });
  }

  openCreate() {
    this.spinner.show();
    const ref = this.dialog.open(ProductsModal, {});
    this.spinner.hide();
    ref.afterClosed().subscribe(product => {
      this.spinner.show();
      if (product) {
        this.svc.createProduct(product).subscribe((res) => {
          this.dataSource.data = [res, ...this.dataSource.data];
          this.spinner.hide();
        }, err => {
          console.error(err);
          this.spinner.hide();
        });
        

        
      }
      this.spinner.hide();
    });
  }

  editar(product: Product) {
    const ID = product.id;
    this.spinner.show();
    const ref = this.dialog.open(ProductsModal, { data: product });
    this.spinner.hide();
    ref.afterClosed().subscribe(product => {
      this.spinner.show();
      console.log(product);
      if (product) {
        this.svc.updateProduct(ID, product).subscribe((res) => {
          this.dataSource.data = this.dataSource.data.filter(p => p.id !== ID);
          this.dataSource.data = [res, ...this.dataSource.data];
          this.spinner.hide();
        }, err => {
          console.error(err);
          this.spinner.hide();
        });
      }
      this.spinner.hide();
    });
  }

  eliminar(product: Product) {
    if (!confirm(`Eliminar ${product.title}?`)) return;
    this.spinner.show();
    this.svc.deleteProduct(product.id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(p => p.id !== product.id);
      this.spinner.hide();
    }, err => {
      console.error(err);
      try {
        this.dataSource.data = this.dataSource.data.filter(p => p.id !== product.id);
      } catch (error) {
        console.log(error);
      }
     
      console.log('aca da error porque id no existe en bd, se borra igual para demo');
      this.spinner.hide();

    });
  }

  
}


