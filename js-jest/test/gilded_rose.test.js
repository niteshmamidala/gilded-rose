const {Shop, Item} = require("../src/gilded_rose");

describe('Gilded Rose', () => {
  it('Once the sell by date has passed, Quality degrades twice as fast', () => {
    const gildedRose = new Shop([new Item('Normal Item', 0, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  });

  it('The Quality of an item is never negative', () => {
    const gildedRose = new Shop([new Item('Normal Item', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  });

  it ('The Quality of an item is never more than 50', () => {
    const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 48)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(50);
  });

  describe('Aged Brie', () => {
    it('Increases in Quality the older it gets', () => {
      const gildedRose = new Shop([new Item('Aged Brie', 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(2);
    });
  });

  describe('Sulfuras', () => {
    it('Being a legendary item, never has to be sold or decreases in Quality', () => {
      const gildedRose = new Shop([new Item('Sulfuras, Hand of Ragnaros', 0, 25)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(0);
      expect(items[0].quality).toBe(25);
    });
  });

  describe('Backstage passes to a TAFKAL80ETC concert', () => {
    it('Like aged brie, increases in Quality as it\'s SellIn value approaches', () => {
      const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 12, 1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(11);
      expect(items[0].quality).toBe(2);
    });

    it('Quality increases by 2 when there are 10 days or less', () => {
      const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(3);
    });

    it('Quality increases by 3 when there are 5 days or less ', () => {
      const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(4);
      expect(items[0].quality).toBe(4);
    });

    it('Quality drops to 0 after the concert', () => {
      const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 15)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(0);
    });
  });

  describe('Conjured', () => {
    it('Items degrade in Quality twice as fast as normal items', () => {
      const gildedRose = new Shop([new Item('Conjured Mana Cake', 0, 2)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(0);
    });
  });
});
