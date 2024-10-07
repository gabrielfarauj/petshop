import { Component, OnInit } from '@angular/core';
import { cartItem } from 'src/app/models/cart-item.model';
import { Cart } from 'src/app/models/cart.model';
import { CartUtil } from 'src/app/utils/cart.utils';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent implements OnInit {
  cart: Cart = new Cart();

  // cartTotalPrice? : number = 0;

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cart = CartUtil.get();
  }

  // Isso até funciona so que quando você exclui o produto, ele não subtrai o valor total
  // if(this.cart.items.length > 0){
  //   for(let item of this.cart.items){
  //     this.cartTotalPrice += item.price
  //     console.log(this.cartTotalPrice)
  //   }
  // }

  public total() {
    let total = 0;
    this.cart.items.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  removeProduct(item: cartItem) {
    // acha o index do item que quero remover
    let index = this.cart.items.indexOf(item);
    // depois uso index pra remover ele
    this.cart.items.splice(index, 1);
    CartUtil.update(this.cart);
  }

  clear() {
    CartUtil.clear();
    this.loadCart();
  }
}
