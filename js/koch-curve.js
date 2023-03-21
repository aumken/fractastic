// variables: A
// constants: + -
// axiom: A
// rules: (A -> A+A−A−A+A)
// angle: pi/2

var start = "A";
var result = start;
var rules = [];
var len = 5;

rules[0] = {
  in: "A",
  out: "A+A-A-A+A"
}

function create() {
  var nextText = "";
  for (var i = 0; i < result.length; i++) {
    var current = result.charAt(i);
    var ruleFound = false;
    for (var j = 0; j < rules.length; j++) {
      if (current == rules[j].in) {
        ruleFound = true;
        nextText += rules[j].out;
        break;
      }
    }
    if (!ruleFound) {
      nextText += current;
    }
  }
  result = nextText;
  createP(result);
  turtle();
}

function turtle() {
    background(0);
    resetMatrix();
    translate(10, height - 10);
    stroke(255);
    len *= 0.95

    for (var i = 0; i < result.length; i++) {
        var current = result.charAt(i);

        if (current == "A") {
            line(0, 0, len, 0);
            translate(len, 0);
        } else if (current == "-") {
            rotate(PI/2);
            
        } else if (current == "+") {
            rotate(-PI/2);
        }
    }
}

function setup() {
  createCanvas(1000, 500)
  background(0);
  turtle();
  createP("l-system: koch curve");
  var button = createButton("create!");
  button.mousePressed(create);
  createP(start);
}