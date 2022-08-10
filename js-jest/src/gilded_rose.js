class Item {
    constructor(name, sellIn, quality){
      this.name = name;
      this.sellIn = sellIn;
      this.quality = quality;
    }
}

const ITEM_NAME = {
    AGED_BRIE: 'Aged Brie',
    BACK_STAGE_PASSES: 'Backstage passes to a TAFKAL80ETC concert',
    SULFURAS: 'Sulfuras, Hand of Ragnaros'
};

const increaseQuality = item => {
    if (item.quality < 50) {
        item.quality = item.quality + 1;
    }
};

const decreaseQuality = item => {
    if (item.quality > 0) {
        item.quality = item.quality - 1;
    }
};

const updateSellIn = item => {
    item.sellIn = item.sellIn - 1;
};

const handleAgedBrieItem = item => {
    increaseQuality(item);
    updateSellIn(item);

    // “Aged Brie” actually increases in Quality the older it gets
    if (item.sellIn < 0) {
        increaseQuality(item);
    }
};

const handleBackStagePassesItem = item => {
    increaseQuality(item);

    if (item.sellIn < 11) {
        increaseQuality(item);
    }

    if (item.sellIn < 6) {
        increaseQuality(item);
    }

    updateSellIn(item);

    // Quality drops to 0 after the concert
    if (item.sellIn < 0) {
        item.quality = 0;
    }
};

const handleSulfurasItem = item => {
    // do nothing as of now
};

const handleNormalItem = item => {
    decreaseQuality(item);
    updateSellIn(item);

    // Once the sell by date has passed, Quality degrades twice as fast
    if (item.sellIn < 0) {
        decreaseQuality(item);
    }
};

class Shop {
    constructor(items=[]){
      this.items = items;
    }

    updateQuality() {
        for (const item of this.items) {
            switch (item.name) {
                case ITEM_NAME.AGED_BRIE:
                    handleAgedBrieItem(item);
                    continue;
                case ITEM_NAME.BACK_STAGE_PASSES:
                    handleBackStagePassesItem(item);
                    continue;
                case ITEM_NAME.SULFURAS:
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
