export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export const PRODUCTS = {
  AGED_BRIE: 'Aged Brie',
  BACKSTAGE_PASSES_TAFKAL80ETC: 'Backstage passes to a TAFKAL80ETC concert',
  SULFURAS: 'Sulfuras, Hand of Ragnaros',
  CONJURED: 'Conjured',
}

// The Quality of an item is never more than 50
const ITEM_MAX_QUALITY = 50;
// The Quality of an item is never negative
const ITEM_MIN_QUALITY = 0


export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  calculateNewItemQuality(item: Item): number {
    // "Aged Brie"increases in Quality the older it gets
    if (item.name === PRODUCTS.AGED_BRIE) {
      return item.quality + 1;
    }
    
    if (item.name === PRODUCTS.BACKSTAGE_PASSES_TAFKAL80ETC) {
      console.log("is backstage")
      console.log("item.sellIn", item.sellIn)
      if (item.sellIn > 10) {
        return item.quality + 1;
      }
      
      // Quality drops to 0 after the concert
      if (item.sellIn <= 0) {
        return 0;
      }

      // Quality increases by 3 when there are 5 days or less
      if (item.sellIn <= 5) {
        return item.quality + 3;
      }

      // Quality increases by 2 when there are 10 days or less
      if (item.sellIn <= 10) {
        return item.quality + 2;
      }
    }

    // Conjured items degrade in Quality twice as fast as normal items
    if (item.name === PRODUCTS.CONJURED) {
      return item.quality - 2;
    }

    // Default case for most products
    const isPastSellByDate = item.sellIn <= 0;
    // Expired items degrade twice as fast
    const newQuality = item.quality - (isPastSellByDate ? 2 : 1);
    return newQuality;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      // "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
      if (item.name === PRODUCTS.SULFURAS) {
        continue;
      }

      const newQuality = this.calculateNewItemQuality(item);
      item.quality = Math.max(Math.min(newQuality, ITEM_MAX_QUALITY), ITEM_MIN_QUALITY);
      item.sellIn -= 1;
    }
    return this.items;
  }
}
