import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  checkoutForm;
  items;
  purchaseSideText;
  purchaseDisabled;
  constructor(private cartService: CartService,
  private formBuilder: FormBuilder) { 
    this.purchaseSideText = "";
    this.purchaseDisabled = "";
    this.items = cartService.getItems();
    this.checkoutForm = this.formBuilder.group({
      name: '',
      address: ''
    });
  }

  ngOnInit() {
    if(this.items.length == 0) {
      this.purchaseDisabled = "yes";
      this.purchaseSideText = "Your shopping cart is empty";
    } else {
      this.purchaseSideText = "";
    }
  }

  onSubmit(data) {
    console.log(data);
    if(this.items.length == 0) {
      this.purchaseSideText = "There is nothing to purchase";
      return;
    } else if(data.name == "" || data.address == "") {
      this.purchaseSideText = "Please fill your details";
      return;
    }
    this.checkoutForm.reset();
    this.cartService.clearItems();
    this.items = this.cartService.getItems();
    this.purchaseSideText = "Items successfully purchased!";
  }

  removeItemByProduct(product) {
    this.cartService.removeItemByProduct(product)
    this.items = this.cartService.getItems();
  }

  clearItems() {
    this.cartService.clearItems();
    this.items = this.cartService.getItems();
  }
}