import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { SecurityUtil } from '../../../utils/security.utils';
import { Router } from '@angular/router';
import { CartUtil } from 'src/app/utils/cart.utils';
import { Cart } from 'src/app/models/cart.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  public user!: User | null;
  public cart?: Cart;
  toggle = false;
  cartQuantity = 0;

  constructor(private router : Router){

  }
  
  ngOnInit(): void {
    this.user = SecurityUtil.getUser();
    this.cart = CartUtil.get();

    for(let quantity of this.cart.items){
      this.cartQuantity += quantity.quantity;
    }
  }

  logout(){
    SecurityUtil.clear();
    this.router.navigate(['/login']);
  }
}
