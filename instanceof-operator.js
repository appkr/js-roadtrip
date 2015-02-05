/**
 * Knight Constructor
 */
function Knight(name, regiment) {
  this.name = name;
  this.regiment = regiment;

  switch(regiment) {
    case 1:
      this.weapon = "Woodsword";
      break;
    case 2:
      this.weapon = "Pickaxe";
      break;
    default:
      this.weapon = "Shovel";
  }
}

/**
 * Armor Constructor
 */
function Armor(location) {
  this.location = location;
}

Armor.prototype = {
  putOn: function() {
    alert("Your armor is on.");
  }
};

/**
 * LeatherArmor Constructor
 */
function LeatherArmor(bodyStyle, numBuckles, numSpaulders) {
  this.bodyStyle = bodyStyle;
  this.numBuckles = numBuckles;
  this.numSpaulders = numSpaulders;
}

LeatherArmor.prototype = Object.create(Armor.prototype);

/**
 * ChainMail Constructor
 */
function ChainMail(metal, linkDiameter, hasHood, skirtLength) {
  this.metal = metal;
  this.linkDiameter = linkDiameter;
  this.hasHood = hasHood;
  this.skirtLength = skirtLength;
}

ChainMail.prototype = Object.create(Armor.prototype);

function assignKnightsArmor(knights, armorAvail) {
  var x = knights.length,
    y = armorAvail.length;

  for(var i = 0; i < x; i++) {
    for(var j = 0; j < y; j++) {
      if(armorAvail[j] instanceof ChainMail) {
        knights[i].armor = armorAvail.splice(j, 1)[0];
        y--;
        break;
      }
    }
  }
}

/** test */
var armorList = [
  new LeatherArmor("Cow", 4, 2),
  new ChainMail("Iron", 5, true, 35),
  new LeatherArmor("Sheep", 4, 2),
  new ChainMail("Cooper", 4, true, 44)
];

var newbs = [
  new Knight("Grimble Horsehead", 1),
  new Knight("Jark Winterborn", 2)
];

assignKnightsArmor(newbs, armorList);
console.log(armorList);
console.log(newbs[0]);

var kingsMail = new ChainMail("Gold", 2, true, 36);
console.log(kingsMail instanceof Armor);