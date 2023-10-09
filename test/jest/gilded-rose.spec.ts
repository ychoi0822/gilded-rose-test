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
});
