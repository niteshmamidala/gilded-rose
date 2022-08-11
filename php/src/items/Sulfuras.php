<?php

namespace GildedRose\items;

use GildedRose\Item;
use GildedRose\ItemManager;


class Sulfuras extends ItemManager
{
    public function updateQuality(): Item
    {
        // no changes required
        return $this->item;
    }
}
