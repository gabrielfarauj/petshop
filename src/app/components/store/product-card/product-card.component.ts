import { Component, Input } from '@angular/core';
import { Product } from '../../../models/product.model';
import { CartUtil } from 'src/app/utils/cart.utils';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private toastr: ToastrService){}

  addCart(){
    CartUtil.add(
      this.product._id,
      this.product.title,
      1,
      this.product.price,
      this.product.images
    )

    this.toastr.success(this.product.title, "Produto adicionado com Sucesso!")
  }
}
