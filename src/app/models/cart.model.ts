import { cartItem } from './cart-item.model';

export class Cart {
  constructor(public items: cartItem[] = []) {}
}
