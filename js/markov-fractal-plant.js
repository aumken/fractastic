// variables: A B
// constants: + - "[" "]"
// axiom: A
// rules: (A -> B+[[A]-A]-B[-BA]+A), (B -> BB)
// angle: pi/7

var start = "A";
var result = start;
var rules = [];
var len = 3;

rules[0] = {
  in: "A",
  out: markov()
}

rules[1] = {
  in: "B",
  out: "BB"
}

function markov() {
    key = [];
    x = Math.random()

    // initial assignment
    if (x < 0.5) {
        key.push("+")
    } else {
        key.push("-")
    }
    
    // markov chain
    for (var i = 1; i < 5; i++) {
        x = Math.random()
        if (key[i-1] == "+") {
            if (x < 0.6) {
                key.push("-")
            } else {
                key.push("+")
            }
        } else if (key[i-1] == "-") {
            if (x < 0.4) {
                key.push("+")
            } else {
                key.push("-")
            }
        }
    }
    
    template = "B" + key[0] + "[[A]" + key[1] + "A]" + key[2] + "B[" + key[3] + "BA]" + key[4] + "A"
    return template
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
        } else if (current == "-") {
            rotate(PI/7);    
        } else if (current == "+") {
            rotate(-PI/7);
        } else if (current == "[") {
            push();
        } else if (current == "]") {
            pop();
        }
    }
}

function setup() {
  createCanvas(1000, 500)
  background(0);
  turtle();
  createP("l-system + markov chains: fractal plant");
  var button = createButton("create!");
  button.mousePressed(create);
  createP(start);
}