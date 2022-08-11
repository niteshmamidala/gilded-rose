export class Item {
  name: string
  sellIn: number
  quality: number

  constructor (name: string, sellIn: number, quality: number) {
    this.name = name
    this.sellIn = sellIn
    this.quality = quality
  }
}

const ITEM_NAME = {
  AGED_BRIE: 'Aged Brie',
  BACK_STAGE_PASSES: 'Backstage passes to a TAFKAL80ETC concert',
  SULFURAS: 'Sulfuras, Hand of Ragnaros'
}

const MIN_QUALITY = 0

const MAX_QUALITY = 50

const increaseQuality = (item: Item) => {
  if (item.quality < MAX_QUALITY) {
    item.quality += 1
  }

  return item
}

const decreaseQuality = (item: Item) => {
  if (item.quality > MIN_QUALITY) {
    item.quality -= 1
  }

  return item
}

const updateSellIn = (item: Item) => {
  item.sellIn -= 1

  return item
}

const handleAgedBrieItem = (item: Item) => {
  increaseQuality(item)
  updateSellIn(item)

  // “Aged Brie” actually increases in Quality the older it gets
  if (item.sellIn < 0) {
    increaseQuality(item)
  }

  return item
}

const handleBackStagePassesItem = (item: Item) => {
  increaseQuality(item)

  if (item.sellIn < 11) {
    increaseQuality(item)
  }

  if (item.sellIn < 6) {
    increaseQuality(item)
  }

  updateSellIn(item)

  // Quality drops to 0 after the concert
  if (item.sellIn < 0) {
    item.quality = 0
  }
}

const handleSulfurasItem = (item: Item) => {
  // do nothing as of now
}

const handleNormalItem = (item: Item) => {
  decreaseQuality(item)
  updateSellIn(item)

  // Once the sell by date has passed, Quality degrades twice as fast
  if (item.sellIn < 0) {
    decreaseQuality(item)
  }

  return item
}

export class GildedRose {
  items: Array<Item>

  constructor (items = [] as Array<Item>) {
    this.items = items
  }

  updateQuality (): Item[] {
    for (const item of this.items) {
      switch (item.name) {
        case ITEM_NAME.AGED_BRIE:
          handleAgedBrieItem(item)
          continue
        case ITEM_NAME.BACK_STAGE_PASSES:
          handleBackStagePassesItem(item)
          continue
        case ITEM_NAME.SULFURAS:
          handleSulfurasItem(item)
          continue
        default:
          handleNormalItem(item)
          continue
      }
    }

    return this.items
  }
}
