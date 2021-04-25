import { Injectable } from '@angular/core';
import {IceCream, IceCreamCategory} from "./models/ice-cream.model";

@Injectable({
  providedIn: 'root'
})
export class IceCreamService {

  iceCreamList: IceCream[] = [];

  constructor() { }

  addToList(iceCream: IceCream){
    this.iceCreamList.push(iceCream);
  }

  getIceCreamList() {
    return this.iceCreamList;
  }
}
