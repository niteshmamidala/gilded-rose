class Item {
    constructor(name, sellIn, quality){
      this.name = name;
      this.sellIn = sellIn;
      this.quality = quality;
    }
}

const itemName = {
    AGED_BRIE: 'Aged Brie',
    BACK_STAGE_PASSES: 'Backstage passes to a TAFKAL80ETC concert',
    SULFURAS: 'Sulfuras, Hand of Ragnaros'
};

const handleAgedBrieItem = (item) => {
    if (item.quality < 50) {
        item.quality = item.quality + 1;
    }

    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0 && item.quality < 50) {
        item.quality = item.quality + 1;
    }
}

const handleBackStagePassesItem = (item) => {
    if (item.quality < 50) {
        item.quality = item.quality + 1;

        if (item.sellIn < 11 && item.quality < 50) {
            item.quality = item.quality + 1;
        }

        if (item.sellIn < 6 && item.quality < 50) {
            item.quality = item.quality + 1;
        }
    }

    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0) {
        item.quality = item.quality - item.quality;
    }
}

const handleSulfurasItem = (item) => {
    // do nothing as of now
}

const handleNormalItem = (item) => {
    if (item.quality > 0) {
        item.quality = item.quality - 1;
    }

    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0 && item.quality > 0) {
        item.quality = item.quality - 1;
    }
}

class Shop {
    constructor(items=[]){
      this.items = items;
    }

    updateQuality() {
        for (const item of this.items) {
            switch (item.name) {
                case itemName.AGED_BRIE:
                    handleAgedBrieItem(item);
                    continue;
                case itemName.BACK_STAGE_PASSES:
                    handleBackStagePassesItem(item);
                    continue;
                case itemName.SULFURAS:
                    handleSulfurasItem(item);
                    continue;
                default:
                    handleNormalItem(item);
                    continue;
            }
        }

        return this.items;
    }
}

module.exports = {
    Item,
    Shop
};
