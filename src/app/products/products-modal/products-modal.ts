import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { Product } from '../products.model';

@Component({
  selector: 'app-products-modal',
  templateUrl: './products-modal.html',
  styleUrl: './products-modal.scss',
  standalone: true,
  imports: [ ...SHARED_IMPORTS ]
})
export class ProductsModal {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProductsModal>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.form = this.fb.group({
      title: [data?.title || '', Validators.required],
      description: [data?.description || '', Validators.required],
      price: [data?.price || '', [Validators.required, Validators.min(0)]],
      stock: [data?.stock || 0, [Validators.required, Validators.min(0)]],
      category: [data?.category],
      sku: [data?.sku],
    
      brand: [data?.brand || ''],
      discountPercentage: [data?.discountPercentage || 0],
      rating: [data?.rating || 0],
      thumbnail: [data?.thumbnail || ''],
      images: [data?.images ? data.images.join(', ') : ''],
      weight: [data?.weight || null],
      dimensions: this.fb.group({
        width: [data?.dimensions?.width || null],
        height: [data?.dimensions?.height || null],
        depth: [data?.dimensions?.depth || null],
      }),
      warrantyInformation: [data?.warrantyInformation || ''],
      shippingInformation: [data?.shippingInformation || ''],
      availabilityStatus: [data?.availabilityStatus || ''],
    });
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}
