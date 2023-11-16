import { Item, GildedRose, PRODUCTS } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('Quality degrades by 1 each day while sellIn is positive', () => {
    const QUALITY = 40;
    const gildedRose = new GildedRose([new Item('default', 10, QUALITY)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(QUALITY - 1);
  });
  
  it('Once the sell by date has passed, Quality degrades twice as fast', () => {
    const QUALITY = 40;
    const gildedRose = new GildedRose([new Item('default', 0, QUALITY)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(QUALITY - 2);
    expect(items[0].sellIn).toBe(-1);
  });
  
  it('The Quality of an item is never negative', () => {
    const MIN_QUALITY = 0;
    const gildedRose = new GildedRose([new Item('default', 0, MIN_QUALITY)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(MIN_QUALITY);
  });
  
  it('Aged Brie actually increases in Quality the older it gets', () => {
    const QUALITY = 40;
    const gildedRose = new GildedRose([new Item(PRODUCTS.AGED_BRIE, 10, 40)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(QUALITY + 1);
  });
  
  it('The Quality of an item is never more than 50', () => {
    const MAX_QUALITY = 50;
    const gildedRose = new GildedRose([new Item(PRODUCTS.AGED_BRIE, 10, MAX_QUALITY)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(MAX_QUALITY);
  });
  
  it('Sulfuras, being a legendary item, never has to be sold or decreases in Quality', () => {
    const QUALITY = 80;
    const SELL_IN_DAYS = 10;
    const gildedRose = new GildedRose([new Item(PRODUCTS.SULFURAS, SELL_IN_DAYS, QUALITY)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(QUALITY);
    expect(items[0].sellIn).toBe(SELL_IN_DAYS);
  });
  
  describe('Backstage passes', () => {
    it('like aged brie increases in Quality as its SellIn value approaches', () => {
      const QUALITY = 20;
      const SELL_IN_DAYS = 15;
      const gildedRose = new GildedRose([new Item(PRODUCTS.BACKSTAGE_PASSES_TAFKAL80ETC, SELL_IN_DAYS, QUALITY)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(QUALITY + 1);
      expect(items[0].sellIn).toBe(SELL_IN_DAYS - 1);
    });

    it('Quality increases by 2 when there are 10 days or less', () => {
      const QUALITY = 20;
      const SELL_IN_DAYS = 9;
      const gildedRose = new GildedRose([new Item(PRODUCTS.BACKSTAGE_PASSES_TAFKAL80ETC, SELL_IN_DAYS, QUALITY)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(QUALITY + 2);
      expect(items[0].sellIn).toBe(SELL_IN_DAYS - 1);
    });

    it('Quality increases by 3 when there are 5 days or less', () => {
      const QUALITY = 30;
      const SELL_IN_DAYS = 5;
      const gildedRose = new GildedRose([new Item(PRODUCTS.BACKSTAGE_PASSES_TAFKAL80ETC, SELL_IN_DAYS, QUALITY)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(QUALITY + 3);
      expect(items[0].sellIn).toBe(SELL_IN_DAYS - 1);
    });

    it('Quality drops to 0 after the concert', () => {
      const QUALITY = 30;
      const SELL_IN_DAYS = 0;
      const gildedRose = new GildedRose([new Item(PRODUCTS.BACKSTAGE_PASSES_TAFKAL80ETC, SELL_IN_DAYS, QUALITY)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
      expect(items[0].sellIn).toBe(SELL_IN_DAYS - 1);
    });

    it('Conjured items degrade in Quality twice as fast as normal items', () => {
      const QUALITY = 30;
      const SELL_IN_DAYS = 10;
      const gildedRose = new GildedRose([new Item(PRODUCTS.CONJURED, SELL_IN_DAYS, QUALITY)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(QUALITY - 2);
      expect(items[0].sellIn).toBe(SELL_IN_DAYS - 1);
    });
  })

  it('Can process multiple items', () => {
    const gildedRose = new GildedRose([
      new Item('Default', 20, 40),
      new Item(PRODUCTS.SULFURAS, 10, 80),
      new Item(PRODUCTS.CONJURED, 20, 50),
    ]);

    const items = gildedRose.updateQuality();
    
    // Default item
    expect(items[0].quality).toBe(39);
    expect(items[0].sellIn).toBe(19);
    // Sulfuras
    expect(items[1].quality).toBe(80);
    expect(items[1].sellIn).toBe(10);
    // Conjured
    expect(items[2].quality).toBe(48);
    expect(items[2].sellIn).toBe(19);
  })
});
