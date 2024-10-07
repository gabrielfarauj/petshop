import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Observable } from 'rxjs';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css'
})
export class ProductsPageComponent implements OnInit {
  public products$! : Observable<Product[]>;

  constructor(private data: DataService){}

  ngOnInit(): void {
    this.products$ = this.data.getProducts();
  }

}
