export enum IceCreamCategory {
  CREAM = "Sahne-Eis",
  FRUIT = "Frucht-Eis",
  WATER = "Wasser-Eis",
}

export class IceCream {
  name: string;
  category: IceCreamCategory;
  foodIntollerances!: string;
  nutritionalValue!: string;
  priceEK!: number;
  priceVK!: number;
  percentageCream!: number;
  percentageFruit!: number;
  ingredients!: Array<string>;
  flavors!: Array<string>;
  fruits!: Array<string>;


  constructor(name: string, category: IceCreamCategory) {
    this.name = name;
    this.category = category;
  }
}
