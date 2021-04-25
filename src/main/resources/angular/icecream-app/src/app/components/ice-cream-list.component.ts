import {Component, Input, OnInit} from '@angular/core';
import {IceCream} from "../models/ice-cream.model";
import {IceCreamService} from "../ice-cream.service";

@Component({
  selector: 'app-ice-cream-list',
  templateUrl: './ice-cream-list.component.html',
  styleUrls: ['./ice-cream-list.component.css']
})
export class IceCreamListComponent implements OnInit {

  listIceCream!: IceCream[];

  constructor(private iceCreamService: IceCreamService) { }

  ngOnInit(): void {
    this.listIceCream = this.iceCreamService.getIceCreamList();
  }

}
