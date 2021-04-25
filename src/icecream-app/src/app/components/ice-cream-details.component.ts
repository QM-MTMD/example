import {Component, Input, OnInit} from '@angular/core';
import {IceCream, IceCreamCategory} from "../models/ice-cream.model";
import {ActivatedRoute} from "@angular/router";

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
      console.log(this.iceCream)
    });
  }
}
