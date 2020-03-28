import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {

  @Input() product;
  @Output() notify1 = new EventEmitter();
  @Output() notify2 = new EventEmitter();
  added = false;
  constructor(private cartService: CartService) { }

  ngOnInit() {
    if(this.cartService.getItems().indexOf(this.product) > -1) {
      this.added = true;
    }
  }

  addToCart(product) {
    this.cartService.addItem(product);
    this.added = true;
    this.notify1.emit();
  }

  removeFromCart(product){
    this.cartService.removeItemByProduct(product);
    this.added = false;
    this.notify2.emit();
  }

}