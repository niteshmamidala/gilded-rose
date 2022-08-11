<?php

namespace GildedRose\items;

use GildedRose\Item;
use GildedRose\ItemManager;


class AgedBrie extends ItemManager
{
    public function updateQuality(): Item
    {
        $this->increaseQuality();
        $this->updateSellIn();

        if ($this->item->sell_in < 0) {
            $this->increaseQuality();
        }

        return $this->item;
    }
}
