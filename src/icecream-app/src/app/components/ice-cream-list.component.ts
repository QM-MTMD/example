import {Component, OnInit} from '@angular/core';
import {IceCreamServiceWrapper} from "../ice-cream-service-wrapper.service";
import {IceCream} from "../generated";
import {Observable} from "rxjs";

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
}
