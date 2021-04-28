import {Injectable, Optional} from '@angular/core';
import {Configuration, IceCream, IcecreamService} from "./generated";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IceCreamServiceWrapper extends IcecreamService {

  $subject!: Subject<Array<IceCream>>;

  constructor(protected httpClient: HttpClient, @Optional() configuration: Configuration) {
    super(httpClient, "http://localhost:9080/qm-ice-machine", configuration);

    this.$subject = new Subject();
    this.iceCreamList().subscribe(d => this.$subject.next(d));
  }

  storeToIceCreamList(iceCream: IceCream): void {
    this.storeIceCream(iceCream).subscribe(ok => {
      this.iceCreamList().subscribe(d => this.$subject.next(d), error => { alert("Fehler beim laden der Liste") });
    })
  }

  getIceCreamList(): Observable<Array<IceCream>> {
    return this.$subject.asObservable();
  }
}
