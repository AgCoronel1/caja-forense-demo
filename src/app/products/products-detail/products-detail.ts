import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { Product } from '../products.model';

@Component({
  selector: 'app-products-detail',
  standalone: true,
  imports: [...SHARED_IMPORTS],
  templateUrl: './products-detail.html',
  styleUrl: './products-detail.scss'
})
export class ProductsDetail {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private dialogRef: MatDialogRef<ProductsDetail>
  ) {}

  close(): void {
    this.dialogRef.close();
  }

}
