import {Component, OnInit} from '@angular/core';
import {IceCreamServiceWrapper} from "../ice-cream-service-wrapper.service";
import {IceCream} from "../generated";

@Component({
  selector: 'app-ice-cream-list',
  templateUrl: './ice-cream-list.component.html',
  styleUrls: ['./ice-cream-list.component.css']
})
export class IceCreamListComponent implements OnInit {

  listIceCream!: Array<IceCream> | undefined;

  constructor(private iceCreamService: IceCreamServiceWrapper) { }

  ngOnInit(): void {
    this.iceCreamService.getIceCreamList().subscribe(data => {
      this.listIceCream = data.icecreamList;
    });
  }

}
