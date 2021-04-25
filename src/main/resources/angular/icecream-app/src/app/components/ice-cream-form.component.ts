import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {FormBuilder} from "@angular/forms";
import {IceCream, IceCreamCategory} from "../models/ice-cream.model";
import {IceCreamService} from "../ice-cream.service";

export interface Ingredient {
  name: string;
}

export interface Flavor {
  name: string;
}

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-ice-cream-form',
  templateUrl: './ice-cream-form.component.html',
  styleUrls: ['./ice-cream-form.component.css']
})
export class IceCreamFormComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly iceCreamCategory = IceCreamCategory;
  @Output() buttonClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  iceCreamForm = this.formBuilder.group({
    name: [''],
    foodIntollerances : [''],
    nutritionalValue : [''],
    priceEK : [''],
    priceVK : [''],
    percentageCream: [''],
    percentageFruit: [''],
  });

  category!: string;
  ingredients: Ingredient[] = [];
  flavors: Flavor[] = [];
  fruits: Flavor[] = [];
  displayAdditionalCream = false;
  displayAdditionalFruit = false;
  displayAdditionalWater = false;


  constructor(private formBuilder:FormBuilder, private iceCreamService: IceCreamService) { }

  ngOnInit(): void {
  }

  addIngredient(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.ingredients.push({name: value.trim()});
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeIngredient(ingredient: Ingredient): void {
    const index = this.ingredients.indexOf(ingredient);

    if (index >= 0) {
      this.ingredients.splice(index, 1);
    }
  }

  submit() {
    if (!this.iceCreamForm.valid) {
      return;
    }

    let iceCream = this.toIceCream();
    console.log(iceCream);
    this.iceCreamService.addToList(iceCream);
    this.resetData();
  }

  private resetData() {
    this.iceCreamForm.reset();
    this.flavors = [];
    this.ingredients = [];
    this.fruits = [];
    this.category = '';
  }

  private toIceCream() {
    let cat: IceCreamCategory;
    switch (this.category) {
      case "CREAM":
        cat = IceCreamCategory.CREAM;
        break;
      case "FRUIT":
        cat = IceCreamCategory.FRUIT;
        break;
      default:
        cat = IceCreamCategory.WATER;
    }

    let iceCream = new IceCream(this.iceCreamForm.controls["name"].value, cat);
    iceCream.foodIntollerances = this.iceCreamForm.controls["foodIntollerances"].value;
    iceCream.nutritionalValue = this.iceCreamForm.controls["nutritionalValue"].value;
    iceCream.priceEK = this.iceCreamForm.controls["priceEK"].value;
    iceCream.priceVK = this.iceCreamForm.controls["priceVK"].value;
    iceCream.percentageCream = this.iceCreamForm.controls["percentageCream"].value;
    iceCream.percentageFruit = this.iceCreamForm.controls["percentageFruit"].value;
    iceCream.ingredients = this.ingredients.map(v => v.name);
    iceCream.flavors = this.flavors.map(v => v.name);
    iceCream.fruits = this.fruits.map(v => v.name);
    return iceCream;
  }

  displayFields(selectedCategory: string) {
    this.displayAdditionalCream = selectedCategory==="CREAM";
    this.displayAdditionalFruit = selectedCategory==="FRUIT";
    this.displayAdditionalWater = selectedCategory==="WATER";
  }

  addFlavor(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.flavors.push({name: value.trim()});
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeFlavor(flavor: Flavor): void {
    const index = this.flavors.indexOf(flavor);

    if (index >= 0) {
      this.flavors.splice(index, 1);
    }
  }

  addFruit(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({name: value.trim()});
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeFruit(fruit: Fruit): void {
    const index = this.flavors.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
}
