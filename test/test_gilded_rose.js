var {expect} = require('chai');
var {Shop, Item} = require('../src/gilded_rose.js');

/*
frequency: once a day

*/

describe("Gilded Rose", function() {

  it("Regular Item Degradation Test", function() {
    const gildedRose = new Shop([ new Item("Foo", 10, 10) ]);
    let items;

    for (let i = 0; i < 5; i++) {
      items = gildedRose.updateQuality();
    }

    expect(items[0].quality, "foo quality test failed").to.equal(5);
    expect(items[0].sellIn, "foo sellin test failed").to.equal(5);
  });


  it("Sell by Date has passed, Quality degrades twice as fast", function() {
    const gildedRose = new Shop([ new Item("Foo", 5, 10) ]);
    let items;

    for (let i = 0; i < 5; i++) {
      items = gildedRose.updateQuality();
    }

    expect(items[0].quality, "foo quality first").to.equal(5);

    items = gildedRose.updateQuality();

    expect(items[0].quality, "foo quality second").to.equal(3);

  });

  it("Quality Never Negative", function() { 
    const gildedRose = new Shop([ new Item("Foo", 10, 10) ]);
    let items = gildedRose.updateQuality();

    for (let i = 0; i < 20; i++) {
      items = gildedRose.updateQuality();
    }

    expect(items[0].quality, "quality is negative").to.equal(0);
  });

  it("Aged Brie Quality Increases", function() { 
    const gildedRose = new Shop([ new Item("Aged Brie", 10, 10) ]);
    let items = gildedRose.updateQuality();

    for (let i = 0; i < 20; i++) {
      items = gildedRose.updateQuality();
    }

    expect(items[0].quality, "quality is negative").to.greaterThan(10);
  });

  it("The Quality of an item is never more than 50", function() { 
    const gildedRose = new Shop([ new Item("Aged Brie", 10, 10), new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10) ]);

    let items = gildedRose.updateQuality();

    for (let i = 0; i < 100; i++) {
      items = gildedRose.updateQuality();
    }
    console.log(items)

    expect(items[0].quality, " aged brie quality is more than 50").to.lessThanOrEqual(50);
    expect(items[1].quality, "backstage pass quality is more than 50").to.lessThanOrEqual(50);

  });

  it("The Quality of an Sulfuras is always 80", function() { 
    const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 10, 80) ]);

    let items = gildedRose.updateQuality();

    for (let i = 0; i < 100; i++) {
      items = gildedRose.updateQuality();
    }

    expect(items[0].quality, " Sulfuras is not 80").to.equal(80);
  });

  it("Backstage passes, Quality increases by 2 when there are 10 days or less", function() { 
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 10, 0) ]);

    let items;
    for (let i = 0; i < 4; i++) {
      items = gildedRose.updateQuality();
    }

    expect(items[0].quality, "Backstage passes quality did not increase by 2 when there are 10 days or less").to.equal(8);
  });

  it("Conjured Test", function() {
    const gildedRose = new Shop([ new Item("Conjured", 10, 10), new Item("Foo", 10, 10) ]);

    let items;
    for (let i = 0; i <= 4; i++) {
      items = gildedRose.updateQuality();
    }
    console.log(items)
    expect(items[0].quality, "").to.equal(0);
    expect(items[1].quality, "").to.equal(5);
  });

});
