export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export enum SpecialItems {
  agedBrie = 'Aged Brie',
  concert = 'Backstage passes to a TAFKAL80ETC concert',
  sulfuras = 'Sulfuras, Hand of Ragnaros',
  conjured = 'Conjured Mana Cake'
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  calculateConcertQualityValue(sellIn: number, quality: number) {
    if (sellIn <= 0) {
      return 0;
    }

    if (sellIn <= 5) {
      const newQuality = quality + 3;
      return newQuality < 50 ? newQuality : 50;
    }

    if (sellIn <= 10) {
      const newQuality = quality + 2;
      return newQuality < 50 ? newQuality : 50;
    }

    return quality + 1;
  }

  calculateQualityValue(item: Item) {
    const { quality, name, sellIn} = item;
    if (quality <= 0 && name !== SpecialItems.agedBrie) return 0;

    if (name === SpecialItems.sulfuras) {
      return quality >= 80 ? 80 : quality;
    }

    if (quality >= 50 && name !==SpecialItems.concert) return 50;

    switch (name) {
      case SpecialItems.agedBrie: {
        return quality < 0 ? 0 : quality + 1;
      }
      case SpecialItems.concert: {
        return this.calculateConcertQualityValue(sellIn, quality);
      }
      case SpecialItems.conjured: {
        return quality - 2;
      }
      default: {
        return sellIn > 0 ? quality - 1 :quality -2;
      }
    }
  }

  calculateSellInValue(item: Item) {
    const { name, sellIn } = item;
    return name === SpecialItems.sulfuras ? sellIn : sellIn - 1;
  }

  updateQuality(): Item[] {
    this.items.forEach((item) => {
      const newQuality = this.calculateQualityValue(item);
      const newSellIn = this.calculateSellInValue(item);

      item.quality = newQuality;
      item.sellIn = newSellIn;
    })

    return this.items;
  }
}
