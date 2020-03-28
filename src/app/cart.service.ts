import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items = [];
  
  constructor(private http: HttpClient) { }

  addItem(product) {
    this.items.push(product);
  }

  removeItemByName(name) {
    this.items = this.items.filter((element, index, array) => {
      return (element.name != name);
    });
  }

  removeItemByProduct(product){
    const index = this.items.indexOf(product);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  getItems() {
    return this.items;
  }

  getItem(name) {
    let itemToBeReturned;
    this.items.map(item => {
      if(item.name == name) {
        itemToBeReturned = item;
      }
    });
    return itemToBeReturned;
  }

  clearItems() {
    this.items = [];
    return this.items;
  }

  getshippingRates() {
    return this.http.get('/assets/shipping.json');
  }
}