import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IceCreamComponent} from "./components/ice-cream.component";
import {IceCreamDetailsComponent} from "./components/ice-cream-details.component";

const routes: Routes = [
  { path: 'icecream', component: IceCreamComponent },
  { path: 'icecream/details', component: IceCreamDetailsComponent },
  { path: '',   component: IceCreamComponent },
  { path: '**', redirectTo: '/icecream', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
