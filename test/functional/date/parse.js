define([
	"globalize",
	"src/date/start-of",
	"json!fixtures/cldr/main/en/ca-gregorian.json",
	"json!fixtures/cldr/main/pt/ca-gregorian.json",
	"json!fixtures/cldr/supplemental/likelySubtags.json",
	"json!fixtures/cldr/supplemental/timeData.json",
	"json!fixtures/cldr/supplemental/weekData.json",
	"globalize/date"
], function( Globalize, startOf, enCaGregorian, ptCaGregorian, likelySubtags, timeData, weekData ) {

var date;

Globalize.load( enCaGregorian );
Globalize.load( ptCaGregorian );
Globalize.load( likelySubtags );
Globalize.load( timeData );
Globalize.load( weekData );
Globalize.locale( "en" );

QUnit.module( "Datetime Parse" );

function assertParseDate( assert, input, options, output ) {
	assert.deepEqual( Globalize.parseDate( input, options ), output, JSON.stringify( options ) );
}

QUnit.test( "should parse skeleton", function( assert ) {
	date = new Date();
	date.setDate( 15 );
	date = startOf( date, "day" );
	assertParseDate( assert, "15", { skeleton: "d" }, date );
	assertParseDate( assert, "15 Wed", { skeleton: "Ed" }, date );

	date = new Date();
	date.setHours( 17 );
	date.setMinutes( 35 );
	date.setSeconds( 7 );
	date = startOf( date, "second" );
	assertParseDate( assert, "Wed 5:35:07 PM", { skeleton: "Ehms" }, date );

	date = new Date( 2010, 8, 15 );
	date = startOf( date, "day" );
	assertParseDate( assert, "Wed, Sep 15, 2010 AD", { skeleton: "GyMMMEd" }, date );
	assertParseDate( assert, "9/15/2010", { skeleton: "yMd" }, date );

	date = new Date( 2010, 0 );
	date = startOf( date, "year" );
	assertParseDate( assert, "Q3 2010", { skeleton: "yQQQ" }, date );

	// Via instance globalize.parseDate().
	assert.deepEqual( Globalize( "pt" ).parseDate( "2010 T3", { skeleton: "yQQQ" } ), date, "{ skeleton: \"yQQQ\" }" );
});

QUnit.test( "should parse time presets", function( assert ) {
	date = new Date();
	date.setHours( 17 );
	date.setMinutes( 35 );
	date.setSeconds( 7 );
	date = startOf( date, "second" );
	assertParseDate( assert, "5:35:07 PM", { time: "medium" }, date );
	date = startOf( date, "minute" );
	assertParseDate( assert, "5:35 PM", { time: "short" }, date );
});

QUnit.test( "should parse date presets", function( assert ) {
	date = new Date( 2010, 8, 15 );
	date = startOf( date, "day" );
	assertParseDate( assert, "Wednesday, September 15, 2010", { date: "full" }, date );
	assertParseDate( assert, "September 15, 2010", { date: "long" }, date );
	assertParseDate( assert, "Sep 15, 2010", { date: "medium" }, date );
	assertParseDate( assert, "9/15/10", { date: "short" }, date );
});

QUnit.test( "should parse datetime presets", function( assert ) {
	date = new Date( 2010, 8, 15 );
	date = startOf( date, "day" );
	assertParseDate( assert, "Wednesday, September 15, 2010", { date: "full" }, date );

	date = new Date( 2010, 8, 15, 17, 35, 7 );
	date = startOf( date, "second" );
	assertParseDate( assert, "Sep 15, 2010, 5:35:07 PM", { datetime: "medium" }, date );
});

QUnit.test( "should parse raw patterns", function( assert ) {
	date = new Date( 2010, 8, 15 );
	date = startOf( date, "day" );
	assertParseDate( assert, "Wed, Sep 15, 2010 AD", { pattern: "E, MMM d, y G" }, date );
});

QUnit.test( "should parse a formatted date (reverse operation test)", function( assert ) {
	date = new Date();
	date = startOf( date, "minute" );
	assert.deepEqual( Globalize.parseDate( Globalize.formatDate( date, { datetime: "short" } ), { datetime: "short" } ), date );
});

});
