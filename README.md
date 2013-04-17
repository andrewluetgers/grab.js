grab.js
=======

Simplify grabbing values out of complex objects.


This is an add-on for for underscore. So in the browser you'll need to load that first

npm module:

	npm install grab

when you require the npm module it will augment root._ if it exists or add it if it doesn't

	require("grab");

Adds just the grab function to underscore

assume the following object for all examples

	var data = {
		stuff: {
			music: {
				name: "Avicii"
				link: "www.avicii.com/"
			},
			movie: {
				name: "Willy Wonka & the Chocolate Factory"
				year: "1971",
				imdb: "http://www.imdb.com/title/tt0067992/"
			}
		}
	};


provide the object and a string representing the path to the value you want

	var music = _.grab(data, "stuff.music.name");
	// music == "Avicii"


prevents ugly errors when attempting to access a value on undefined

	var game = _.grab(data, "stuff.game.name");
	// game == undefined


supports default values, if a value is undefined, null or "" the default will be used

	var musicYear = _.grab(data, "stuff.music.year", "--");
	// musicYear == "--"


supports alternate paths, if one fails it will try the next

	var link = _.grab(data, ["stuff.music.url", "stuff.music.link"]);
	// link == "www.avicii.com/"


combine multiple paths with a default value

	var link = _.grab(data, ["stuff.blah.broken.url", "stuff.missing.href"], "none");
	// link == "none"


declare multiple selections in one object

	var items = _.grab(data, {
		artist: "stuff.music.name",
		movieYear: "stuff.movie.year"
	});
	// items = {artist: "Avicii", movieYear: "1971"};


use an array to include a default value when using the multiple selection syntax

	var items = _.grab(data, {
		artist: ["stuff.blah.name", "none"],
		movieYear: ["stuff.foo.year", "unknown"]
	});
	// items = {artist: "none", movieYear: "unknown"};


using an array for multiple paths is supported here too

	var items = _.grab(data, {
		artist: [["stuff.blah.name", "stuff.music.name"]],
		movieYear: [["stuff.foo.year", "stuff.movie.year"]]
	});
	// items = {artist: "Avicii", movieYear: "1971"};


and the above with default values

	var items = _.grab(data, {
		artist: [["stuff.blah.name", "stuff.music.missing"], "--"],
		movieYear: [["stuff.foo.year", "stuff.movie.broken"], "--"]
	});
	// items = {artist: "--", movieYear: "--"};