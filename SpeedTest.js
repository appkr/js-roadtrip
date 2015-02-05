function SpeedTest(testImplement, testPrams, repetitions) {
  this.testImplement = testImplement;
  this.testPrams = testPrams;
  this.repetitions = repetitions || 10000;
  this.average = 0;
}

SpeedTest.prototype = {
  startTest: function() {
    var beginTime,
      endTime,
      sumTimes = 0;

    for(var i = 0, x = this.repetitions; i < x; i++) {
      beginTime = +new Date();
      this.testImplement(this.testPrams);
      endTime = +new Date();
      sumTimes += endTime - beginTime;
    }

    this.average = sumTimes / this.repetitions;

    return console.log("Average execution across " + this.repetitions + ": " + this.average);
  }
};

/** test */

function Knight(name, regiment) {
  this.name = name;
  this.regiment = regiment;

  switch(regiment) {
    case 1:
      this.weapon = "Broadsword";
      break;
    case 2:
      this.weapon = "Claymore";
      break;
    default:
      this.weapon = "WoodSword";
  }
}

var firstRegimentNewbs = [
  "Grimble Horsehead",
  "Jark Winterborn",
  "Bunder Ropefist",
  "Earst Breadbaker"
];

var firstRegimentKnights = [];

var listForTests = [firstRegimentNewbs, firstRegimentKnights];

var test = function (listOfParams) {
  for (var i = 0, x = listOfParams[0].length; i < x; i++) {
    listOfParams[1].push(new Knight(listOfParams[0][i], 1));
  }
};

var test = new SpeedTest(test, listForTests);
test.startTest();
