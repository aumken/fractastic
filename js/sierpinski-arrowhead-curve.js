// variables: A B
// constants: + -
// axiom: A
// rules: (A -> B−A−B), (B -> A+B+A)
// angle: pi/3

var start = "A";
var result = start;
var rules = [];
var len = 5;

rules[0] = {
  in: "A",
  out: "B-A-B"
}

rules[1] = {
    in: "B",
    out: "A+B+A"
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
    translate(10, height/2);
    stroke(255);

    for (var i = 0; i < result.length; i++) {
        var current = result.charAt(i);

        if (current == "A" || current == "B") {
            line(0, 0, len, 0);
            translate(len, 0);
        } else if (current == "-") {
            rotate(PI/3);
            
        } else if (current == "+") {
            rotate(-PI/3);
        }
    }
}

function setup() {
  createCanvas(1000, 500)
  background(0);
  turtle();
  createP("l-system: sierpinski arrowhead curve");
  var button = createButton("create!");
  button.mousePressed(create);
  createP(start);
}