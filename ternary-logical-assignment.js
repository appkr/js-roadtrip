var armory = {
  swords: [
    "Broadsword",
    "Claymore",
    "Scimitar",
    "Longsword",
    "Mace",
    "WarHammer",
    "BattleAxe",
    "Halberd",
    "MorningStar"
  ],
  addSword: function(sword) {
    this.swords = this.swords || [];
    this.swords.push(sword);
  },
  retrieveSword: function(request) {
    var index = this.swords.indexOf(request);
    return index >= 0 ? this.swords.splice(index, 1)[0] : alert("No " + request + "baby !");
  }
};

var armoryIsOpen = true;
var isKnight = true;
var weapon = armoryIsOpen && isKnight && armory.retrieveSword("Claymore");
console.log(weapon);