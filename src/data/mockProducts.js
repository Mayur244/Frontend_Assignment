// Mock product data to use when the API is unavailable
export const mockProducts = [
    {
      code: "3017620422003",
      product_name: "Nutella",
      brands: "Ferrero",
      categories: "Spreads, Sweet spreads, Chocolate spreads, Hazelnut spreads, Cocoa and hazelnuts spreads",
      image_url: "https://images.openfoodfacts.org/images/products/301/762/042/2003/front_en.289.400.jpg",
      nutrition_grades: "e",
      ingredients_text:
        "Sugar, palm oil, hazelnuts 13%, skimmed milk powder 8.7%, fat-reduced cocoa 7.4%, emulsifier: lecithins (soy), vanillin.",
      nutriments: {
        energy_100g: 2252,
        energy_unit: "kJ",
        fat_100g: 30.9,
        "saturated-fat_100g": 10.6,
        carbohydrates_100g: 57.5,
        sugars_100g: 56.3,
        proteins_100g: 6.3,
        salt_100g: 0.107,
        fiber_100g: 3.4,
      },
    },
    {
      code: "5449000000996",
      product_name: "Coca-Cola",
      brands: "Coca-Cola",
      categories: "Beverages, Carbonated drinks, Sodas, Colas",
      image_url: "https://images.openfoodfacts.org/images/products/544/900/000/0996/front_en.427.400.jpg",
      nutrition_grades: "e",
      ingredients_text:
        "Carbonated water, high fructose corn syrup, caramel color, phosphoric acid, natural flavors, caffeine.",
      nutriments: {
        energy_100g: 180,
        energy_unit: "kJ",
        fat_100g: 0,
        "saturated-fat_100g": 0,
        carbohydrates_100g: 10.6,
        sugars_100g: 10.6,
        proteins_100g: 0,
        salt_100g: 0,
        fiber_100g: 0,
      },
    },
    {
      code: "7622210449283",
      product_name: "Oreo Original",
      brands: "Mondelez",
      categories: "Snacks, Sweet snacks, Biscuits and cakes, Biscuits, Chocolate biscuits, Sandwich biscuits",
      image_url: "https://images.openfoodfacts.org/images/products/762/221/044/9283/front_en.373.400.jpg",
      nutrition_grades: "d",
      ingredients_text:
        "Wheat flour, sugar, palm oil, fat-reduced cocoa powder 4.6%, wheat starch, glucose-fructose syrup, raising agents (potassium hydrogen carbonate, ammonium hydrogen carbonate, sodium hydrogen carbonate), salt, emulsifiers (soy lecithin, sunflower lecithin), flavouring (vanillin).",
      nutriments: {
        energy_100g: 2010,
        energy_unit: "kJ",
        fat_100g: 19,
        "saturated-fat_100g": 8.5,
        carbohydrates_100g: 69,
        sugars_100g: 35,
        proteins_100g: 5,
        salt_100g: 0.9,
        fiber_100g: 2.5,
      },
    },
    {
      code: "3017620425035",
      product_name: "Kinder Bueno",
      brands: "Ferrero",
      categories: "Snacks, Sweet snacks, Biscuits and cakes, Chocolate biscuits, Wafers",
      image_url: "https://images.openfoodfacts.org/images/products/301/762/042/5035/front_en.348.400.jpg",
      nutrition_grades: "e",
      ingredients_text:
        "Milk chocolate 31.5% (sugar, cocoa butter, cocoa mass, skimmed milk powder, concentrated butter, emulsifier: lecithins (soy), vanillin), sugar, palm oil, wheat flour, hazelnuts (10.5%), skimmed milk powder, whole milk powder, chocolate (sugar, cocoa mass, cocoa butter, emulsifier: lecithins (soy), vanillin), milk fat, emulsifier: lecithins (soy), raising agents (sodium bicarbonate, ammonium bicarbonate), salt, vanillin.",
      nutriments: {
        energy_100g: 2252,
        energy_unit: "kJ",
        fat_100g: 34.2,
        "saturated-fat_100g": 14.1,
        carbohydrates_100g: 51.6,
        sugars_100g: 41.7,
        proteins_100g: 9.2,
        salt_100g: 0.4,
        fiber_100g: 3.2,
      },
    },
    {
      code: "8000500310427",
      product_name: "Ferrero Rocher",
      brands: "Ferrero",
      categories: "Snacks, Sweet snacks, Confectioneries, Chocolates, Chocolate candies, Pralines",
      image_url: "https://images.openfoodfacts.org/images/products/800/050/031/0427/front_en.291.400.jpg",
      nutrition_grades: "e",
      ingredients_text:
        "Milk chocolate 30% (sugar, cocoa butter, cocoa mass, skimmed milk powder, concentrated butter, emulsifier: lecithins (soy), vanillin), hazelnuts (28.5%), sugar, palm oil, wheat flour, whey powder, fat-reduced cocoa, emulsifier: lecithins (soy), raising agent (sodium bicarbonate), salt, vanillin.",
      nutriments: {
        energy_100g: 2410,
        energy_unit: "kJ",
        fat_100g: 42.2,
        "saturated-fat_100g": 14.4,
        carbohydrates_100g: 39.5,
        sugars_100g: 34.2,
        proteins_100g: 8.2,
        salt_100g: 0.17,
        fiber_100g: 4.1,
      },
    },
    {
      code: "3168930010265",
      product_name: "Lay's Classic Potato Chips",
      brands: "Lay's",
      categories: "Snacks, Salty snacks, Chips and crisps, Potato chips",
      image_url: "https://images.openfoodfacts.org/images/products/316/893/001/0265/front_en.264.400.jpg",
      nutrition_grades: "d",
      ingredients_text: "Potatoes, vegetable oils (sunflower, corn), salt.",
      nutriments: {
        energy_100g: 2241,
        energy_unit: "kJ",
        fat_100g: 34.5,
        "saturated-fat_100g": 3.1,
        carbohydrates_100g: 50.2,
        sugars_100g: 0.5,
        proteins_100g: 6.1,
        salt_100g: 1.2,
        fiber_100g: 4.2,
      },
    },
    {
      code: "3033710065967",
      product_name: "Greek Yogurt",
      brands: "Fage",
      categories: "Dairy, Fermented foods, Fermented milk products, Yogurts, Greek yogurts",
      image_url: "https://images.openfoodfacts.org/images/products/303/371/006/5967/front_en.197.400.jpg",
      nutrition_grades: "a",
      ingredients_text:
        "Pasteurized milk, cream, live active yogurt cultures (L. Bulgaricus, S. Thermophilus, L. Acidophilus, Bifidus, L. Casei).",
      nutriments: {
        energy_100g: 406,
        energy_unit: "kJ",
        fat_100g: 5,
        "saturated-fat_100g": 3.3,
        carbohydrates_100g: 3.8,
        sugars_100g: 3.8,
        proteins_100g: 10,
        salt_100g: 0.1,
        fiber_100g: 0,
      },
    },
    {
      code: "5201360631445",
      product_name: "Extra Virgin Olive Oil",
      brands: "Iliada",
      categories:
        "Plant-based foods, Vegetable fats, Oils, Vegetable oils, Olive oils, Virgin olive oils, Extra-virgin olive oils",
      image_url: "https://images.openfoodfacts.org/images/products/520/136/063/1445/front_en.128.400.jpg",
      nutrition_grades: "c",
      ingredients_text: "Extra virgin olive oil.",
      nutriments: {
        energy_100g: 3700,
        energy_unit: "kJ",
        fat_100g: 100,
        "saturated-fat_100g": 14,
        carbohydrates_100g: 0,
        sugars_100g: 0,
        proteins_100g: 0,
        salt_100g: 0,
        fiber_100g: 0,
      },
    },
    {
      code: "3228857000166",
      product_name: "Whole Grain Bread",
      brands: "Biona",
      categories: "Plant-based foods, Cereals and potatoes, Breads, Whole grain breads",
      image_url: "https://images.openfoodfacts.org/images/products/322/885/700/0166/front_en.173.400.jpg",
      nutrition_grades: "a",
      ingredients_text: "Whole grain wheat flour, water, sourdough (rye flour, water), sea salt, yeast.",
      nutriments: {
        energy_100g: 930,
        energy_unit: "kJ",
        fat_100g: 1.2,
        "saturated-fat_100g": 0.2,
        carbohydrates_100g: 42,
        sugars_100g: 1.5,
        proteins_100g: 8.5,
        salt_100g: 1.1,
        fiber_100g: 7.5,
      },
    },
    {
      code: "3175680011480",
      product_name: "Evian Natural Mineral Water",
      brands: "Evian",
      categories: "Beverages, Waters, Spring waters, Mineral waters",
      image_url: "https://images.openfoodfacts.org/images/products/317/568/001/1480/front_en.148.400.jpg",
      nutrition_grades: "a",
      ingredients_text: "Natural mineral water.",
      nutriments: {
        energy_100g: 0,
        energy_unit: "kJ",
        fat_100g: 0,
        "saturated-fat_100g": 0,
        carbohydrates_100g: 0,
        sugars_100g: 0,
        proteins_100g: 0,
        salt_100g: 0.005,
        fiber_100g: 0,
      },
    },
    {
      code: "8076809513722",
      product_name: "Spaghetti",
      brands: "Barilla",
      categories:
        "Plant-based foods, Cereals and potatoes, Cereal grains, Pastas, Wheat pastas, Durum wheat pastas, Spaghetti",
      image_url: "https://images.openfoodfacts.org/images/products/807/680/951/3722/front_en.268.400.jpg",
      nutrition_grades: "a",
      ingredients_text: "Durum wheat semolina, water.",
      nutriments: {
        energy_100g: 1521,
        energy_unit: "kJ",
        fat_100g: 1.5,
        "saturated-fat_100g": 0.3,
        carbohydrates_100g: 75,
        sugars_100g: 3.5,
        proteins_100g: 12.5,
        salt_100g: 0.01,
        fiber_100g: 3,
      },
    },
    {
      code: "3017620429484",
      product_name: "Nutella Biscuits",
      brands: "Ferrero",
      categories: "Snacks, Sweet snacks, Biscuits and cakes, Biscuits, Chocolate biscuits, Filled biscuits",
      image_url: "https://images.openfoodfacts.org/images/products/301/762/042/9484/front_en.207.400.jpg",
      nutrition_grades: "e",
      ingredients_text:
        "Wheat flour 30.5%, palm oil, sugar, hazelnuts 7.6%, fat-reduced cocoa powder 5.8%, skimmed milk powder, whey powder, emulsifier: lecithins (soy), raising agents (ammonium hydrogen carbonate, sodium hydrogen carbonate), salt, vanillin.",
      nutriments: {
        energy_100g: 2252,
        energy_unit: "kJ",
        fat_100g: 29.5,
        "saturated-fat_100g": 11.8,
        carbohydrates_100g: 56.3,
        sugars_100g: 35.2,
        proteins_100g: 6.6,
        salt_100g: 0.529,
        fiber_100g: 2.6,
      },
    },
    {
      code: "3245390096197",
      product_name: "Organic Bananas",
      brands: "Organic Farmers",
      categories: "Fruits, Fresh fruits, Bananas",
      image_url: "https://images.openfoodfacts.org/images/products/324/539/009/6197/front_en.124.400.jpg",
      nutrition_grades: "a",
      ingredients_text: "Organic bananas.",
      nutriments: {
        energy_100g: 371,
        energy_unit: "kJ",
        fat_100g: 0.3,
        "saturated-fat_100g": 0.1,
        carbohydrates_100g: 20.3,
        sugars_100g: 18.1,
        proteins_100g: 1.1,
        salt_100g: 0.001,
        fiber_100g: 2.6,
      },
    },
  ]
  
  