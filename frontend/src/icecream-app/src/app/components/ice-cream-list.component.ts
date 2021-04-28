import {Component, OnInit} from '@angular/core';
import {IceCreamServiceWrapper} from "../ice-cream-service-wrapper.service";
import {IceCream} from "../generated";
import {Observable} from "rxjs";
import {IceCreamCategory} from "../models/ice-cream-category.model";
import CategoryEnum = IceCream.CategoryEnum;

@Component({
  selector: 'app-ice-cream-list',
  templateUrl: './ice-cream-list.component.html',
  styleUrls: ['./ice-cream-list.component.css']
})
export class IceCreamListComponent implements OnInit {

  $listIceCream!: Observable<Array<IceCream>>;

  constructor(private iceCreamService: IceCreamServiceWrapper) { }

  ngOnInit(): void {
    this.$listIceCream = this.iceCreamService.getIceCreamList();
  }

  selectedCategory(category: CategoryEnum): IceCreamCategory {
    switch (category) {
      case "CREAM":
        return IceCreamCategory.CREAM;
      case "FRUIT":
        return IceCreamCategory.FRUIT;
      default:
        return IceCreamCategory.WATER;
    }
  }
}
