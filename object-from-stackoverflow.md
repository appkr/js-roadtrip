Here is a hack that will do what you need - be aware that it modifies the Object's prototype, something people frown upon (usually for good reason)

    Object.prototype.getName = function() {
       var funcNameRegex = /function (.{1,})\(/;
       var results = (funcNameRegex).exec((this).constructor.toString());
       return (results && results.length > 1) ? results[1] : "";
    };

Now, all of your objects will have the function, `getName()`, that will return the name of the constructor as a string. I have tested this in FF3 and IE7, I can't speak for other implementations.

If you don't want to do that, here is a discussion on the various ways of determining types in JavaScript...

----------

I recently updated this to be a bit more exhaustive, though it is hardly that. Corrections welcome...

## Using the `constructor` property...

Every object has a value for its `constructor` property, but depending on how that object was constructed as well as what you want to do with that value, it may or may not be useful.

Generally speaking, you can use the `constructor` property to test the type of the object like so:

    var myArray = [1,2,3];
    (myArray.constructor == Array); // true

So, that works well enough for most needs. That said...

###Caveats

An example where it isn't as obvious is using multiple inheritance:

    function a() { this.foo = 1;}
    function b() { this.bar = 2; }
    b.prototype = new a(); // b inherits from a

Things now don't work as you might expect them to:

    var f = new b(); // instantiate a new object with the b constructor
    (f.constructor == b); // false
    (f.constructor == a); // true

So, you might get unexpected results if the object your testing has a different object set as its prototype. There are ways around this outside the scope of this discussion.

There are other uses for the `constructor` property, some of them interesting, others not so much; for now we will not delve into those uses since it isn't relevant to this discussion.

### Will not work cross-frame and cross-window

Using `.constructor` for type checking will break when you want to check the type of objects coming from different `window` objects, say that of an iframe or a popup window. This is because there's a different version of each core type constructor in each `window', i.e.

    iframe.contentWindow.Array === Array // false


----------
## Using the `instanceof` operator...

The `instanceof` operator is a clean way of testing object type as well, but has its own potential issues, just like the `constructor` property.

    var myArray = [1,2,3];
    (myArray instanceof Array); // true
    (myArray instanceof Object); // true

But `instanceof` fails to work for primitive values

    3 instanceof Number // false
    'abc' instanceof String // false
    true instanceof Boolean // false

A wrapper is needed around primitives in order for `instanceof` to work, for example

    new Number(3) instanceof Number // true

This is ironic because the `.constructor` check works fine for primitives

    3..constructor === Number // true
    'abc'.constructor === String // true
    true.constructor === Boolean // true

Why two dots for the 3? Because Javascript interprets the first dot as a decimal point ;)

### Will not work cross-frame and cross-window

`instanceof` also will not work across different windows, for the same reason as the constructor property check.

----------
## Using the `name` property of the `constructor` property...
### Does NOT work in &lt;IE9

Using `myObjectInstance.constructor.name` will give you a string containing the name of the constructor function used, but is subject to the caveats about the constructor property that were mentioned earlier.

For IE9 and above, you can [monkey-patch in support](http://matt.scharley.me/2012/03/09/monkey-patch-name-ie.html):

    if (Function.prototype.name === undefined && Object.defineProperty !== undefined) {
        Object.defineProperty(Function.prototype, 'name', {
            get: function() {
                var funcNameRegex = /function\s+([^\s(]+)\s*\(/;
                var results = (funcNameRegex).exec((this).toString());
                return (results && results.length > 1) ? results[1] : "";
            },
            set: function(value) {}
        });
    }

**Updated version** from the article in question. This was added 3 months after the article was published, this is the recommended version to use by the article's author Matthew Scharley. This change was inspired by [comments pointing out potential pitfalls][1] in the previous code.

    if (Function.prototype.name === undefined && Object.defineProperty !== undefined) {
        Object.defineProperty(Function.prototype, 'name', {
            get: function() {
                var funcNameRegex = /function\s([^(]{1,})\(/;
                var results = (funcNameRegex).exec((this).toString());
                return (results && results.length > 1) ? results[1].trim() : "";
            },
            set: function(value) {}
        });
    }

----------
## Using Object.prototype.toString

It turns out, as [this post details][2], you can use Object.prototype.toString - the low level and generic implementation of toString - to get the type for all built-in types

    Object.prototype.toString.call('abc') // [object String]
    Object.prototype.toString.call(/abc/) // [object RegExp]
    Object.prototype.toString.call([1,2,3]) // [object Array]

One could write a short helper function such as

    function type(obj){
        return Object.prototype.toString.call(obj).slice(8, -1);
    }

to remove the cruft and get at just the type name

    type('abc') // String

However, it will return 'Object' for all user-defined types.

----------
## Caveats for all...

All of these are subject to one potential problem, and that is the question of how the object in question was constructed. Here are various ways of building objects and the values that the different methods of type checking will return:

    // using a named function:
    function Foo() { this.a = 1; }
    var obj = new Foo();
    (obj instanceof Object);          // true
    (obj instanceof Foo);             // true
    (obj.constructor == Foo);         // true
    (obj.constructor.name == "Foo");  // true

    // let's add some prototypical inheritance
    function Bar() { this.b = 2; }
    Foo.prototype = new Bar();
    obj = new Foo();
    (obj instanceof Object);          // true
    (obj instanceof Foo);             // true
    (obj.constructor == Foo);         // false
    (obj.constructor.name == "Foo");  // false


    // using an anonymous function:
    obj = new (function() { this.a = 1; })();
    (obj instanceof Object);              // true
    (obj.constructor == obj.constructor); // true
    (obj.constructor.name == "");         // true


    // using an anonymous function assigned to a variable
    var Foo = function() { this.a = 1; };
    obj = new Foo();
    (obj instanceof Object);      // true
    (obj instanceof Foo);         // true
    (obj.constructor == Foo);     // true
    (obj.constructor.name == ""); // true


    // using object literal syntax
    obj = { foo : 1 };
    (obj instanceof Object);            // true
    (obj.constructor == Object);        // true
    (obj.constructor.name == "Object"); // true

While not all permutations are present in this set of examples, hopefully there are enough to provide you with an idea about how messy things might get depending on your needs. Don't assume anything, if you don't understand exactly what you are after, you may end up with code breaking where you don't expect it to because of a lack of grokking the subtleties.

###NOTE:

Discussion of the `typeof` operator may appear to be a glaring omission, but it really isn't useful in helping to identify whether an object is a given type, since it is very simplistic. Understanding where `typeof` is useful is important, but I don't currently feel that it is terribly relevant to this discussion. My mind is open to change though. :)


  [1]: http://matt.scharley.me/2012/03/09/monkey-patch-name-ie.html#comment-551654096
  [2]: http://perfectionkills.com/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/