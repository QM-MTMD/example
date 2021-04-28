import {Injectable, Optional} from '@angular/core';
import {Configuration, IceCream, IcecreamService} from "./generated";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IceCreamServiceWrapper extends IcecreamService {

  constructor(protected httpClient: HttpClient, @Optional() configuration: Configuration) {
    super(httpClient, "http://localhost:9080/qm-ice-machine", configuration);
  }

  storeToIceCreamList(iceCream: IceCream){
    return this.storeIceCream(iceCream);
  }

  getIceCreamList(): Observable<Array<IceCream>> {
    return this.iceCreamList();
  }
}
