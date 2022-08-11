<?php

namespace GildedRose\items;

use GildedRose\Item;
use GildedRose\ItemManager;


class BackstagePasses extends ItemManager
{
    public function updateQuality(): Item
    {
        $this->increaseQuality();

        if ($this->item->sell_in < 11) {
            $this->increaseQuality();
        }

        if ($this->item->sell_in < 6) {
            $this->increaseQuality();
        }

        $this->updateSellIn();

        if ($this->item->sell_in < 0) {
            $this->resetQualityToZero();
        }

        return $this->item;
    }
}
