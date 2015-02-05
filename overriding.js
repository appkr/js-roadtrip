Number.prototype.numberFormat = function (){
  return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

Object.prototype.getName = function() {
   var funcNameRegex = /function (.{1,})\(/;
   var results = (funcNameRegex).exec((this).constructor.toString());
   return (results && results.length > 1) ? results[1] : "";
};

Object.prototype.findOwnerOfProperty = function(propName) {
  var currentObject = this;

  while(currentObject !== null) {
    if (currentObject.hasOwnProperty(propName)) {
      return currentObject.getName();
    } else {
      currentObject = currentObject.__proto__;
    }
  }

  return "No property found!";
};

var Tornado = function(category, affectedAreas, windGust) {
  this.category = category;
  this.affectedAreas = affectedAreas;
  this.windGust = windGust;
};

Tornado.prototype.valueOf = function() {
  var sum = 0;

  for (var i = 0, len = this.affectedAreas.length; i < len; i++) {
    sum += this.affectedAreas[i][1];
  }

  return sum;
};

Tornado.prototype.toString = function() {
  var list = "";

//   var last = this.affectedAreas.pop();

//   list = this.affectedAreas.map(function(affectedArea) {
//       return affectedArea[0];
//     }).join(", ") + ", and " + last[0];

  for (var i = 0, len = this.affectedAreas.length; i < len; i++) {
    if (i < len -1) {
      list = list + this.affectedAreas[i][0] + ", ";
    } else {
      list = list + "and " + this.affectedAreas[i][0];
    }
  }

  return "This tornado has been certified as an " + this.category + ", with wind gusts up to " + this.windGust + "mph. Affected areas are: " + list + ", potentially affecting a population of " + this.valueOf().numberFormat() + ".";
};

var cities = [
  ["Kansas City", 464310],
  ["Topeka", 127939],
  ["Lenexa", 49398]
];

var twister = new Tornado("F5", cities, 220);

/*
twister.valueOf();
cities.push(["Olathe", 130045]);
twister.valueOf();
twister.constructor;
twister.constructor.prototype;
twister.__proto__;
*/