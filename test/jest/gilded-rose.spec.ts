import { Item, GildedRose } from '../../app/gilded-rose';

describe('Gilded Rose', () => {
  describe('Aged Brie', () => {
    it ('Quality cannot be negative', () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", 1, -2)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });

    it('Should increase quality by one when quality is less than 50', () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", 2, 40)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(1);
      expect(items[0].quality).toBe(41);
    });

    it('Should not increase quality anymore when quality is more than 50', () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", 2, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(1);
      expect(items[0].quality).toBe(50);
    });
  });


  describe('Backstage passes to a TAFKAL80ETC concert', () => {
    it ('Quality cannot be negative', () => {
      const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 1, -2)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });

    it ('Quality cannot be more than 50', () => {
      const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 1, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50);
    });

    it('Should increase quality by one when concert is more than 10 days', () => {
      const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 30)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(10);
      expect(items[0].quality).toBe(31);
    });

    it('Should increase quality by two when concert is less than 10 days', () => {
      const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 30)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(32);
    });

    it('Should increase quality by three when concert is less than 5 days', () => {
      const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 30)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(4);
      expect(items[0].quality).toBe(33);
    });

    it('Should reduce quality to 0 after the concert', () => {
      const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 30)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(0);
    });
  });

  describe('Sulfuras, Hand of Ragnaros', () => {
    it ('Quality cannot be negative', () => {
      const gildedRose = new GildedRose([new Item("Sulfuras, Hand of Ragnaros", 1, -2)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });

    it('Should not reduce sellIn or quality value', () => {
      const gildedRose = new GildedRose([new Item("Sulfuras, Hand of Ragnaros", 10, 30)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(10);
      expect(items[0].quality).toBe(30);
    });

    it('Only this item can have quality more than 50', () => {
      const gildedRose = new GildedRose([new Item("Sulfuras, Hand of Ragnaros", 10, 60), new Item("Test Item", 10, 60)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(10);
      expect(items[0].quality).toBe(60);

      expect(items[1].sellIn).toBe(9);
      expect(items[1].quality).toBe(50);
    });
  });

  describe('Other Items', () => {
    it('Quality cannot be negative', () => {
      const gildedRose = new GildedRose([new Item("Test Item", 1, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });

    it ('Quality cannot be more than 50', () => {
      const gildedRose = new GildedRose([new Item("Test Item", 1, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50);
    });

    it('Should reduce quality by one before the sell date', () => {
      const gildedRose = new GildedRose([new Item("Test Item", 3, 2)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(2);
      expect(items[0].quality).toBe(1);
    });

    it('Should reduce quality by two after the sell date', () => {
      const gildedRose = new GildedRose([new Item("Test Item", -1, 2)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(-2);
      expect(items[0].quality).toBe(0);
    });
  });
});
