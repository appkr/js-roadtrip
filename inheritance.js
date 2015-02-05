var Shoe = function(shoeSize, shoeColor, forGender, constructStyle) {
    this.size = shoeSize;
    this.color = shoeColor;
    this.gender = forGender;
    this.construction = constructStyle;
};

Shoe.prototype = {
    putOn: function() {
        alert("Your " + this.construction + "'s " + "on, dude!");
    },
    takeOff: function() {
        alert("Phew! Somebody's size " + this.size + "'s " + "are fragrant!");
    }
};