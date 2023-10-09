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

  calculateConcert(sellIn: number, quality: number): { quality: number, sellIn: number } {
    const newSellIn = sellIn - 1;

    if (sellIn <= 0) {
      return { quality: 0, sellIn: newSellIn };
    }

    if (sellIn < 6) {
      return { quality: quality >= 49 ? 50 : quality + 3, sellIn: newSellIn };
    }

    if (sellIn < 11) {
      return { quality: quality >= 49 ? 50 : quality + 2, sellIn: newSellIn };
    }

    return { quality: quality >= 49 ? 50 : quality + 1, sellIn: newSellIn };
  }

  calculateQualityAndSellIn(item: Item): { quality: number, sellIn: number } {
    if (item.name === SpecialItems.sulfuras) {
      return item.quality >= 0 ? item : { ...item, quality: 0};
    }

    if (item.quality <= 0 && item.name !== SpecialItems.agedBrie) {
      return { quality: 0, sellIn: item.sellIn - 1 };
    }

    if (item.quality >= 49 && item.name !== SpecialItems.concert) {
      return { quality: 50, sellIn: item.sellIn - 1 };
    }

    switch (item.name) {
      case SpecialItems.agedBrie: {
        if (item.sellIn <= 0) {
          return { quality: item.quality < 0 ? 0 : item.quality + 2, sellIn: item.sellIn - 1 }
        }
        return { quality: item.quality < 0 ? 0 : item.quality + 1, sellIn: item.sellIn - 1 }
      }

      case SpecialItems.concert: {
        return this.calculateConcert(item.sellIn, item.quality);
      }

      case SpecialItems.conjured: {
        return { quality: item.quality - 2, sellIn: item.sellIn - 1 };
      }

      default: {
        if (item.sellIn <= 0) {
          return { quality: item.quality - 2, sellIn: item.sellIn - 1 };
        }

        return { quality: item.quality - 1, sellIn: item.sellIn - 1 };
      }
    }
  }

  updateQuality() {
    this.items.forEach((item) => {
      const { quality, sellIn } = this.calculateQualityAndSellIn(item);

      item.quality = quality;
      item.sellIn = sellIn;
    })

    return this.items;
  }
}
