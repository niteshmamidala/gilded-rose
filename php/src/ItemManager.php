<?php

namespace GildedRose;


abstract class ItemManager
{
    /**
     * @var Item
     */
    protected $item;

    /**
     * ItemManager constructor
     */
    public function __construct(Item $item)
    {
        $this->item = $item;
    }


    abstract public function updateQuality(): Item;


    protected function increaseQuality(): Item
    {
        if ($this->item->quality < GildedRose::MAX_QUALITY) {
            ++$this->item->quality;
        }

        return $this->item;
    }


    protected function decreaseQuality(): Item
    {
        if ($this->item->quality > GildedRose::MIN_QUALITY) {
            --$this->item->quality;
        }

        return $this->item;
    }


    protected function updateSellIn(): Item
    {
        --$this->item->sell_in;

        return $this->item;
    }


    protected function resetQualityToZero(): Item
    {
        $this->item->quality = 0;

        return $this->item;
    }
}
