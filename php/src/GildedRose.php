<?php

declare(strict_types=1);

namespace GildedRose;

use GildedRose\items\AgedBrie;
use GildedRose\items\BackstagePasses;
use GildedRose\items\Normal;
use GildedRose\items\Sulfuras;


final class GildedRose
{
    public const ITEM_NAME_AGED_BRIE = 'Aged Brie';

    public const ITEM_NAME_BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert';

    public const ITEM_NAME_SULFURAS = 'Sulfuras, Hand of Ragnaros';

    public const MIN_QUALITY = 0;

    public const MAX_QUALITY = 50;

    /**
     * @var Item[]
     */
    private $items;

    /**
     * GildedRose constructor
     */
    public function __construct(array $items)
    {
        $this->items = $items;
    }


    public function updateQuality(): array
    {
        $updatedItems = [];

        /** @var Item $item */
        foreach ($this->items as $item) {
            switch ($item->name) {
                case self::ITEM_NAME_AGED_BRIE:
                    $itemManager = new AgedBrie($item);
                    break;
                case self::ITEM_NAME_BACKSTAGE_PASSES:
                    $itemManager = new BackstagePasses($item);
                    break;
                case self::ITEM_NAME_SULFURAS:
                    $itemManager = new Sulfuras($item);
                    break;
                default:
                    $itemManager = new Normal($item);
                    break;
            }

            $updatedItems[] = $itemManager->updateQuality();
        }

        return $updatedItems;
    }
}
