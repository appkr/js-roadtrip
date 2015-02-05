function SignalFire(ID, startingLogs) {
  this.fireID = ID;
  this.logsLeft = startingLogs;
}

SignalFire.prototype = {
  addLogs: function(numLogs) {
    this.logsLeft += numLogs;
  },
  lightFire: function() {
    alert("Woooosh!");
  },
  smokeSignal: function(message) {
    var x = message.length;

    if(this.logsLeft < (x / 10)) {
      alert("Not enough fuel to send the current message!");
    } else {
      this.lightFire();

      for(var i = 0; i < x; i++) {
        alert("(((" + message[i] + ")))");

        if(i % 10 === 0 && i !== 0) {
          this.logsLeft--;
        }
      }
    }
  }
};

var fireOne = new SignalFire(1, 20);
var fireTwo = new SignalFire(2, 18);
var fireThree = new SignalFire(3, 24);

fireOne.addLogs(8);
fireTwo.addLogs(10);
fireThree.addLogs(4);

fireThree.smokeSignal("Goblins!");