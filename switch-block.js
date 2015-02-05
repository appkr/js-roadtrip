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

function ceremonialDagger(knight, rank) {
  this.length = 8;
  this.owner = knight;

  switch(rank) {
    case "King": this.diamonds = 1;
    case "High Constable": this.amethyst = 2;
    case "Field Marshal": this.saphires = 4;
    case "Captain": this.emeralds =1;
    case "Knight": this.rubies = 6;
  }
}

var solder = new Knight("Richard", 2);
console.log(solder.weapon);

var knightDagger = new ceremonialDagger("Jerome", "Knight");
console.log(knightDagger);

var marshalsDagger = new ceremonialDagger("Timothy", "Field Marshal");
console.log(marshalsDagger);

var kingsDagger = new ceremonialDagger("Arthur", "King");
console.log(kingsDagger);