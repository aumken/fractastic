// variables: A, B
// constants: [, ]
// axiom: A
// rules: (B -> BB), (A -> B[A]A)
// angle: pi/4

var start = "A";
var result = start;
var rules = [];
var len = 3;

rules[0] = {
  in: "B",
  out: "BB"
}

rules[1] = {
  in: "A",
  out: "B[A]A"
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
    translate(width / 2, height);
    stroke(255);

    for (var i = 0; i < result.length; i++) {
        var current = result.charAt(i);

        if (current == "B") {
            line(0, 0, 0, -len);
            translate(0, -len);
        } else if (current == "[") {
            push();
            rotate(PI/4);
            
        } else if (current == "]") {
            pop();
            rotate(-PI/4);
        }
    }
}

function setup() {
  createCanvas(1000, 500)
  background(0);
  turtle();
  createP("l-system: fractal tree");
  var button = createButton("create!");
  button.mousePressed(create);
  createP(start);
}