import { Cart } from '../models/cart.model';
import { cartItem } from '../models/cart-item.model';

export class CartUtil {
  public static get(): Cart {
    const data = localStorage.getItem('petshopcart');

    // Caso não tenha dados, retorna um novo carrinho vazio
    if (!data) {
      return new Cart();
    }

    // Caso tenha algo, retorna o carrinho com algo
    return JSON.parse(data);
  }

  public static add(
    id: string,
    product: string,
    quantity: number,
    price: number,
    images: string[]
  ) {
    // obtem o carrinho
    let cart = this.get();

    // cria um novo item
    const item = new cartItem(id, product, quantity, price, images);

    if (cart.items.length > 0) {
      for (let cartItem of cart.items) {
        if (item.id == cartItem.id) {
          cartItem.quantity += item.quantity;

          // Salva o produto gerado no localStorage
          localStorage.setItem('petshopcart', JSON.stringify(cart));
          return;
        }
      }
      cart.items.push(item);
      localStorage.setItem('petshopcart', JSON.stringify(cart));
    } else {
      // Salva o item no carrinho
      cart.items.push(item);
      localStorage.setItem('petshopcart', JSON.stringify(cart));
    }
  }

  public static update(cart: Cart) {
    localStorage.setItem('petshopcart', JSON.stringify(cart));
  }

  public static clear() {
    localStorage.removeItem('petshopcart');
  }
}
