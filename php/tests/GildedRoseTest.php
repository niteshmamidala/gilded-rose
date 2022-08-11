<?php

declare(strict_types=1);

namespace Tests;

use GildedRose\GildedRose;
use GildedRose\Item;
use PHPUnit\Framework\TestCase;


class GildedRoseTest extends TestCase
{
    public function testOnceTheSellByDateHasPassedQualityDegradesTwiceAsFast(): void
    {
        $items = [new Item('Random Item', 0, 2)];
        $gildedRose = new GildedRose($items);
        $gildedRose->updateQuality();
        $this->assertSame(-1, $items[0]->sell_in);
        $this->assertSame(0, $items[0]->quality);
    }


    public function testQualityOfItemIsNonNegative(): void
    {
        $items = [new Item('Normal Item', 0, 0)];
        $gildedRose = new GildedRose($items);
        $gildedRose->updateQuality();
        $this->assertSame(-1, $items[0]->sell_in);
        $this->assertSame(0, $items[0]->quality);
    }


    public function testQualityOfAnItemIsNeverMoreThan50(): void
    {
        $items = [new Item('Backstage passes to a TAFKAL80ETC concert', 5, 48)];
        $gildedRose = new GildedRose($items);
        $gildedRose->updateQuality();
        $this->assertSame(4, $items[0]->sell_in);
        $this->assertSame(50, $items[0]->quality);
    }


    public function testAgedBrieIncreasesInQualityTheOlderItGets(): void
    {
        $items = [new Item('Aged Brie', 0, 0)];
        $gildedRose = new GildedRose($items);
        $gildedRose->updateQuality();
        $this->assertSame(-1, $items[0]->sell_in);
        $this->assertSame(2, $items[0]->quality);
    }


    public function testBackstagePassesIncreasesInQualityAsItsSellInValueApproaches(): void
    {
        $items = [new Item('Backstage passes to a TAFKAL80ETC concert', 12, 1)];
        $gildedRose = new GildedRose($items);
        $gildedRose->updateQuality();
        $this->assertSame(11, $items[0]->sell_in);
        $this->assertSame(2, $items[0]->quality);
    }


    public function testBackstagePassesQualityIncreasesBy2WhenThereAre10DaysOrLess(): void
    {
        $items = [new Item('Backstage passes to a TAFKAL80ETC concert', 10, 1)];
        $gildedRose = new GildedRose($items);
        $gildedRose->updateQuality();
        $this->assertSame(9, $items[0]->sell_in);
        $this->assertSame(3, $items[0]->quality);
    }


    public function testBackstagePassesQualityIncreasesBy3WhenThereAre5DaysOrLess(): void
    {
        $items = [new Item('Backstage passes to a TAFKAL80ETC concert', 5, 1)];
        $gildedRose = new GildedRose($items);
        $gildedRose->updateQuality();
        $this->assertSame(4, $items[0]->sell_in);
        $this->assertSame(4, $items[0]->quality);
    }


    public function testBackstagePassesQualityDropsTo0AfterTheConcert(): void
    {
        $items = [new Item('Backstage passes to a TAFKAL80ETC concert', 0, 15)];
        $gildedRose = new GildedRose($items);
        $gildedRose->updateQuality();
        $this->assertSame(-1, $items[0]->sell_in);
        $this->assertSame(0, $items[0]->quality);
    }


    public function testSulfurasNeverHasToBeSoldOrDecreasesInQuality(): void
    {
        $items = [new Item('Sulfuras, Hand of Ragnaros', 0, 50)];
        $gildedRose = new GildedRose($items);
        $gildedRose->updateQuality();
        $this->assertSame(0, $items[0]->sell_in);
        $this->assertSame(50, $items[0]->quality);
    }


    public function testConjuredItemsDegradeInQualityTwiceAsFastAsNormalItems(): void
    {
        $items = [new Item('Conjured Mana Cake', 0, 2)];
        $gildedRose = new GildedRose($items);
        $gildedRose->updateQuality();
        $this->assertSame(-1, $items[0]->sell_in);
        $this->assertSame(0, $items[0]->quality);
    }
}
