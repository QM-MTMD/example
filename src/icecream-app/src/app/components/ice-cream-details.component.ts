import {Component, OnInit} from '@angular/core';
import {IceCreamCategory} from "../models/ice-cream-category.model";
import {ActivatedRoute} from "@angular/router";
import {IceCream} from "../generated";

@Component({
  selector: 'app-ice-cream-details',
  templateUrl: './ice-cream-details.component.html',
  styleUrls: ['./ice-cream-details.component.css']
})
export class IceCreamDetailsComponent implements OnInit {

  iceCream!: IceCream;
  categories = IceCreamCategory;

  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.queryParams.subscribe(params => {
      this.iceCream = JSON.parse(params.iceCream) as IceCream;
      console.log(this.iceCream);
    });
  }

  selectedCategory(): IceCreamCategory {
    switch (this.iceCream.category) {
      case "CREAM":
        return IceCreamCategory.CREAM;
      case "FRUIT":
        return IceCreamCategory.FRUIT;
      default:
        return IceCreamCategory.WATER;
    }
  }
}
