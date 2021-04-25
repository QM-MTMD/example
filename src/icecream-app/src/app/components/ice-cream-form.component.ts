import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {FormBuilder} from "@angular/forms";
import {IceCreamServiceWrapper} from "../ice-cream-service-wrapper.service";
import {IceCream} from "../generated";
import CategoryEnum = IceCream.CategoryEnum;

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
  readonly iceCreamCategory = CategoryEnum;
  @Output() buttonClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  iceCreamForm = this.formBuilder.group({
    name: [''],
    foodIntollerances: [''],
    nutritionalValue: [''],
    priceEK: [''],
    priceVK: [''],
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


  constructor(private formBuilder: FormBuilder, private iceCreamService: IceCreamServiceWrapper) {
  }

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

    this.iceCreamService.storeToIceCreamList(this.mapToIceCream());
    this.resetData();
  }

  private resetData() {
    this.iceCreamForm.reset();
    this.flavors = [];
    this.ingredients = [];
    this.fruits = [];
    this.category = '';
  }

  private mapToIceCream() {
    let cat: CategoryEnum;
    switch (this.category) {
      case "Cream":
        cat = CategoryEnum.Cream;
        break;
      case "Fruit":
        cat = CategoryEnum.Fruit;
        break;
      default:
        cat = CategoryEnum.Water;
    }

    let iceCream = {
      name: this.iceCreamForm.controls["name"].value,
      category: cat,
      foodIntollerances: this.iceCreamForm.controls["foodIntollerances"].value,
      nutritionalValue: this.iceCreamForm.controls["nutritionalValue"].value,
      priceEK: this.iceCreamForm.controls["priceEK"].value,
      priceVK: this.iceCreamForm.controls["priceVK"].value,
      percentageCream: this.iceCreamForm.controls["percentageCream"].value,
      percentageFruit: this.iceCreamForm.controls["percentageFruit"].value,
      ingredients: this.ingredients.map(v => v.name),
      flavors: this.flavors.map(v => v.name),
      fruits: this.fruits.map(v => v.name),
    }
    console.log(iceCream);
    return iceCream;
  }

  displayFields(selectedCategory: string) {
    this.displayAdditionalCream = selectedCategory === "Cream";
    this.displayAdditionalFruit = selectedCategory === "Fruit";
    this.displayAdditionalWater = selectedCategory === "Water";
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
