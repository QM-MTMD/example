package com.qm.example.icecream;

import java.util.List;

enum IceCreamCategory {
    CREAM, FRUIT, WATER
}

public class IceCream {
    String name;
    IceCreamCategory category;
    String foodIntollerances;
    double nutritionalValue;
    double priceEK;
    double priceVK;
    double percentageCream;
    double percentageFruit;
    List<String> ingredients;
    List<String> flavors;
    List<String> fruits;
}
