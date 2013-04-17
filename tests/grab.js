module("_.grab");


test("_.grab", function() {

	var testObj = {

		foo: {
			stuff: [1,2,3,[6,7,8, {test:["str", ,8]}]]
		},

		bar: {
			name: "bar",
			age: 0,
			tall: false,
			nully: null,
			undefinedly: undefined,
			emptyStr: ""
		},

		baz: [{
			name: "baz1"
		}, {
			name: "baz2",
			loc: {
				country: {
					us: {
						state: {
							mn: {
								city: "nevis",
								pop: false
							}
						}
					}

				}
			}
		}]
	}

	// basic
	var name = _.grab(testObj, "bar.name");
	equal(name, "bar", "when accessing a property via dot notation it should return the value");

	var missing1 = _.grab(testObj, "bar.name.missing");
	ok(missing1 === undefined, "when accessing a missing property via dot notation it should return undefined");

	var missing2 = _.grab(testObj, "bar.missing");
	ok(missing2 === undefined, "when accessing a missing property via dot notation it should return undefined");

	var missing3 = _.grab(testObj, "missing.missing");
	ok(missing3 === undefined, "when accessing a missing property via dot notation it should return undefined");


	// retrieving falsy values
	var falsy1 = _.grab(testObj, "bar.age");
	ok(falsy1 === 0, "when accessing a falsy property via dot notation it should return the value");

	var falsy1 = _.grab(testObj, "bar.tall");
	ok(falsy1 === false, "when accessing a falsy property via dot notation it should return the value");

	var falsy1 = _.grab(testObj, "bar.nully");
	ok(falsy1 === null, "when accessing a falsy property via dot notation it should return the value");

	var falsy1 = _.grab(testObj, "bar.undefinedly");
	ok(falsy1 === undefined, "when accessing a falsy property via dot notation it should return the value");

	var falsy1 = _.grab(testObj, "bar.emptyStr");
	ok(falsy1 === "", "when accessing a falsy property via dot notation it should return the value");



	// basic with defaults
	var name = _.grab(testObj, "bar.name", "defualtVal");
	equal(name, "bar", "when accessing a property with a default value provided it should return the value");

	var missing1 = _.grab(testObj, "bar.name.missing", "defualtVal");
	ok(missing1 === "defualtVal", "when accessing a missing property with a default value provided it should return the default value");

	var missing2 = _.grab(testObj, "bar.missing", "defualtVal");
	ok(missing2 === "defualtVal", "when accessing a missing property with a default value provided it should return the default value");

	var missing3 = _.grab(testObj, "missing.missing", "defualtVal");
	ok(missing3 === "defualtVal", "when accessing a missing property with a default value provided it should return the default value");



	// retrieving falsy values with default value
	var falsy1 = _.grab(testObj, "bar.age", "defualtVal");
	ok(falsy1 === 0, "when accessing a falsy property via dot notation it should return the value");

	var falsy1 = _.grab(testObj, "bar.tall", "defualtVal");
	ok(falsy1 === false, "when accessing a falsy property via dot notation it should return the value");

	var falsy1 = _.grab(testObj, "bar.nully", "defualtVal");
	ok(falsy1 === "defualtVal", "when accessing a falsy property via dot notation it should return the value");

	var falsy1 = _.grab(testObj, "bar.undefinedly", "defualtVal");
	ok(falsy1 === "defualtVal", "when accessing a falsy property via dot notation it should return the value");

	var falsy1 = _.grab(testObj, "bar.emptyStr", "defualtVal");
	ok(falsy1 === "defualtVal", "when accessing a falsy property via dot notation it should return the value");




	// complex
	var city1 = _.grab(testObj, "baz.1.loc.country.us.state.mn.city");
	ok(city1 === "nevis", "When accessing a value deep in an object including an array index with dot notation should return the value");

	var city2 = _.grab(testObj, "baz[1].loc.country.us.state.mn.city");
	ok(city2 === "nevis","When accessing a value deep in an object including an array index should return the value");

	// bad key
	var missing4 = _.grab(testObj, "baz.1.loc.country.us.state.va.city");
	ok(missing4 === undefined, "When accessing a missing value deep in an object including an array index with dot notation should return undefined");

	var missing5 = _.grab(testObj, "baz[1].loc.country.us.state.va.city");
	ok(missing5 === undefined,"When accessing a missing value deep in an object including an array index should return undefined");

	// bad array index
	var missing4 = _.grab(testObj, "baz.5.loc.country.us.state.mn.city");
	ok(missing4 === undefined, "When accessing a missing value deep in an object including an array index with dot notation should return undefined");

	var missing5 = _.grab(testObj, "baz[5].loc.country.us.state.mn.city");
	ok(missing5 === undefined,"When accessing a missing value deep in an object including an array index should return undefined");

	// complex
	var city3 = _.grab(testObj, "baz.1.loc.us.state.mn.city", "none");
	var city4 = _.grab(testObj, "baz[0].loc.country.us.state.mn.city", "none");

	ok(city3 === "none", "When accessing a missing value deep in an object including a default value with dot notation should return the default value");
	ok(city4 === "none","When accessing a missing value deep in an object including a default value should return the default value");

	// multiple paths
	var name2 = _.grab(testObj, ["bar.blah.test", "foo.bar", "bar.name"]);
	equal(name2, "bar", "when accessing a property via dot notation with multiple options it should return the value");

	// multiple paths and default value
	var name3 = _.grab(testObj, ["bar.blah.test", "foo.bar", "bar.zap"], "defaultVal");
	equal(name3, "defaultVal", "when accessing a property via dot notation with multiple options it should return the value");



	// retrieving falsy values with multiple paths and default value
	var falsy1 = _.grab(testObj, ["bar.blah.test", "foo.bar", "bar.zap", "bar.age"], "defualtVal");
	equal(falsy1, 0, "when accessing a falsy property via dot notation it should return the value");

	var falsy1 = _.grab(testObj, ["bar.blah.test", "foo.bar", "bar.zap", "bar.tall"], "defualtVal");
	equal(falsy1, false, "when accessing a falsy property via dot notation it should return the value");

	var falsy1 = _.grab(testObj, ["bar.blah.test", "foo.bar", "bar.zap", "bar.nully"], "defualtVal");
	ok(falsy1 === "defualtVal", "when accessing a falsy property via dot notation it should return the value");

	var falsy1 = _.grab(testObj, ["bar.blah.test", "foo.bar", "bar.zap", "bar.undefinedly"], "defualtVal");
	ok(falsy1 === "defualtVal", "when accessing a falsy property via dot notation it should return the value");

	var falsy1 = _.grab(testObj, ["bar.blah.test", "foo.bar", "bar.zap", "bar.emptyStr"], "defualtVal");
	ok(falsy1 === "defualtVal", "when accessing a falsy property via dot notation it should return the value");


	// object syntax

	var results = _.grab(testObj, {
		name: "bar.name",
		missing1: "bar.name.missing",
		missing2: ["bar.name.missing", "defaultVal"]
	});

	equal(results.name, "bar", "when using object syntax and accessing a property via dot notation it should return the value");
	ok(results.missing1 === undefined, "when using object syntax and accessing a missing property via dot notation it should return undefined");
	ok(results.missing2 === "defaultVal", "when using object syntax and accessing a missing property via dot notation with a default value it should return the default value");


	var results = _.grab(testObj, {
		name: [["bar.blah.test", "foo.bar", "bar.zap", "bar.name"]],
		age: [["bar.blah.test", "foo.bar", "bar.zap", "bar.age"]],
		missing1: [["bar.blah.test", "foo.bar", "bar.zap"]],
		name2: [["bar.blah.test", "foo.bar", "bar.zap", "bar.name"], "defaultVal"],
		age2: [["bar.blah.test", "foo.bar", "bar.zap", "bar.age"], "defaultVal"],
		missing2: [["bar.blah.test", "foo.bar", "bar.zap"], "defaultVal"]
	});

	equal(results.name, "bar", "when using object syntax and accessing a property via dot notation it should return the value");
	equal(results.age, 0, "when using object syntax and accessing a property via dot notation it should return the value");
	ok(results.missing1 === undefined, "when using object syntax and accessing a missing property via dot notation it should return undefined");


	equal(results.name2, "bar", "when using object syntax and accessing a property via dot notation with a default value it should return the default value");
	equal(results.age2, 0, "when using object syntax and accessing a property via dot notation with a default value it should return the default value");
	ok(results.missing2 === "defaultVal", "when using object syntax and accessing a missing property via dot notation with a default value it should return the default value");


});



