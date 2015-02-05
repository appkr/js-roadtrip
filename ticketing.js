var parkRides = [
  ["Birch Bumper", 40],
  ["Pines Plunge", 55],
  ["Cedar Coaster", 20],
  ["Ferries Whell of Fires", 90]
];

var fastPassQueue = [
  "Cedar Coaster",
  "Pines Plunge",
  "Birch Bumper",
  "Pines Plunge"
];

function buildTicket(allRides, passRides, pick) {
  if (passRides[0] == pick) {
    var pass = passRides.shift();

    return function() {
      alert("Quick! You've got a Fast Pass to " + pass + "!");
      console.log(passRides);
    };
  } else {
    for(var i = 0, len = allRides.length; i < len; i++) {
      if (allRides[i][0] == pick) {
        return function() {
          alert("A ticket is printing for " + pick + "!\n" + "Your wait time is about " + allRides[i][1] + " minutes.");
          console.log(passRides);
        };
      }
    }
  }
}

var wantsRide = "Birch Bumper";

// Self invoking anonymous function
buildTicket(parkRides, fastPassQueue, wantsRide)();