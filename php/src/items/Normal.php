<?php

namespace GildedRose\items;

use GildedRose\Item;
use GildedRose\ItemManager;


class Normal extends ItemManager
{
    public function updateQuality(): Item
    {
        $this->decreaseQuality();
        $this->updateSellIn();

        if ($this->item->sell_in < 0) {
            $this->decreaseQuality();
        }

        return $this->item;
    }
}
