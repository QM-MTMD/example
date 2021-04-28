import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IceCreamServiceWrapper} from "../ice-cream-service-wrapper.service";
import {IceCream} from "../generated";
import CategoryEnum = IceCream.CategoryEnum;
import {IceCreamCategory} from "../models/ice-cream-category.model";

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

  iceCreamForm!: FormGroup;
  ingredients: Ingredient[] = [{name: 'Pusemuckel'}, {name: 'NochMehrMuckel'}];
  flavors: Flavor[] = [{name: 'Vanille'}];
  fruits: Fruit[] = [{name: 'Erdbeere'}];
  displayAdditionalCream = false;
  displayAdditionalFruit = false;
  displayAdditionalWater = false;


  constructor(private formBuilder: FormBuilder, private iceCreamService: IceCreamServiceWrapper) {
  }

  ngOnInit(): void {
    this.iceCreamForm = this.formBuilder.group({
      name: ['Vanille'],
      category: ['FRUIT'],
      foodIntollerances: ['Laktose'],
      nutritionalValue: ['110'],
      priceEK: ['0.55'],
      priceVK: ['1.6'],
      percentageCream: ['12'],
      percentageFruit: ['30'],
    });
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
  }

  private mapToIceCream(): IceCream {
    let cat: CategoryEnum;

    switch (this.iceCreamForm.controls["category"].value) {
      case "CREAM":
        cat = CategoryEnum.Cream;
        break;
      case "FRUIT":
        cat = CategoryEnum.Fruit;
        break;
      default:
        cat = CategoryEnum.Water;
    }

    let iceCream = {
      name: this.iceCreamForm.controls["name"].value,
      category: cat,
      foodintollerances: this.iceCreamForm.controls["foodIntollerances"].value,
      nutritionalValue: this.iceCreamForm.controls["nutritionalValue"].value,
      priceEK: this.iceCreamForm.controls["priceEK"].value,
      priceVK: this.iceCreamForm.controls["priceVK"].value,
      creamPercentage: this.iceCreamForm.controls["percentageCream"].value,
      fruitPercentage: this.iceCreamForm.controls["percentageFruit"].value,
      ingredients: this.ingredients.map(v => v.name),
      flavors: this.flavors.map(v => v.name),
      fruits: this.fruits.map(v => v.name),
    }
    console.log(iceCream);
    return iceCream;
  }

  displayFields(selectedCategory: string) {
    this.displayAdditionalCream = selectedCategory === "CREAM";
    this.displayAdditionalFruit = selectedCategory === "FRUIT";
    this.displayAdditionalWater = selectedCategory === "WATER";
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
